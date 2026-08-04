import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function GET() {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    const txtPath = path.join(process.cwd(), 'data', 'recomendacoes.txt');
    const txt = fs.readFileSync(txtPath, 'utf8');

    const lines = txt.split('\n').filter(l => l.trim().length > 0);
    
    let countAtiva = 0;
    let countExpirada = 0;
    let countNaoEncontrados = 0;
    
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
        const fallbackUpdate = await prisma.membro.updateMany({
          where: { nome: { contains: last + ', ' + first } },
          data: { 
            idade: isNaN(idade) ? undefined : idade,
            recomendacao: recStatus 
          }
        });
        if (fallbackUpdate.count === 0) countNaoEncontrados++;
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Mágica concluída! Atualizadas ${countAtiva} ativas e ${countExpirada} expiradas/sem com sucesso! Idades ajustadas.` 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
