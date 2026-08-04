const { Pool } = require('pg');
const { PrismaPg } = require('@prisma/adapter-pg');
const { PrismaClient } = require('@prisma/client');
const fs = require('fs');
const path = require('path');

// Lendo o .env manualmente porque o Node puro não carrega sozinho como o Next.js
let dbUrl = process.env.DATABASE_URL;
const envPath = path.join(__dirname, '.env');
if (!dbUrl && fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8');
  const match = envContent.match(/DATABASE_URL="?([^"\n]+)"?/);
  if (match) dbUrl = match[1];
}

const pool = new Pool({ connectionString: dbUrl });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

async function run() {
  console.log("Iniciando a Mágica das Recomendações e Idades...");
  try {
    const txtPath = path.join(__dirname, 'data', 'recomendacoes.txt');
    const txt = fs.readFileSync(txtPath, 'utf8');

    const lines = txt.split('\n').filter(l => l.trim().length > 0);
    
    let countAtiva = 0;
    let countExpirada = 0;
    
    for (const line of lines) {
      const parts = line.split('\t');
      if (parts.length < 5) continue;
      
      const nomeRaw = parts[0];
      const idadeStr = parts[2];
      const situacao = parts[4];
      
      let nomeFormatado = nomeRaw.trim();
      if (nomeFormatado.includes(',')) {
        const nParts = nomeFormatado.split(',');
        nomeFormatado = nParts[1].trim() + ' ' + nParts[0].trim();
      }
      
      const idade = parseInt(idadeStr, 10);
      
      let recStatus = 'Não se aplica';
      const sit = situacao.trim().toLowerCase();
      if (sit === 'ativa' || sit === 'emitido em' || sit === 'para vencer') {
        recStatus = 'Ativa';
      } else if (sit === 'vencida' || sit === 'cancelada') {
        recStatus = 'Expirada/Sem';
      }
      
      if (recStatus === 'Ativa') countAtiva++;
      if (recStatus === 'Expirada/Sem') countExpirada++;

      const updated = await prisma.membro.updateMany({
        where: { nome: nomeFormatado },
        data: { 
          idade: isNaN(idade) ? undefined : idade,
          recomendacao: recStatus 
        }
      });
      
      if (updated.count === 0) {
        // Fallback for names
        const first = nomeFormatado.split(' ')[0];
        const last = nomeFormatado.split(' ').pop();
        await prisma.membro.updateMany({
          where: { nome: { contains: last + ', ' + first } },
          data: { 
            idade: isNaN(idade) ? undefined : idade,
            recomendacao: recStatus 
          }
        });
      }
    }

    console.log(`===========================================`);
    console.log(`✅ SUCESSO! Mágica Concluída!`);
    console.log(`Recomendações ATIVAS gravadas: ${countAtiva}`);
    console.log(`Recomendações EXPIRADAS gravadas: ${countExpirada}`);
    console.log(`As IDADES de todos eles também foram arrumadas no banco!`);
    console.log(`===========================================`);
  } catch (error) {
    console.error("❌ ERRO:", error);
  } finally {
    await prisma.$disconnect();
  }
}

run();
