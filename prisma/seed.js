import { PrismaClient } from '@prisma/client';
import { membrosReais, inverterNome } from '../app/dashboard/indicadores/mockData.js';

const prisma = new PrismaClient();

async function main() {
  console.log('Iniciando carga de dados no Banco de Dados (PostgreSQL)...');
  
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth() + 1;
  let count = 0;

  for (let i = 0; i < membrosReais.length; i++) {
    const r = membrosReais[i];
    
    // Estimativas
    let idade = 30;
    if (r.org === 'Primária') idade = 5 + (i % 6);
    else if (['Moças', 'Sacerdote', 'Mestre', 'Diácono'].includes(r.org)) idade = 12 + (i % 6);
    else idade = 18 + (i % 50);

    const isAniversariante = (r.mes === mesAtual);
    const status = (i % 5 === 0) ? 'Precisa de Ajuda' : 'Ativo';
    const focoMissao = (idade >= 17 && idade <= 25) ? 'Preparação Missão (Até 25 anos)' : 'Não se aplica';
    const precisaChamado = (i % 4 === 0) ? 'Sim' : 'Não';
    const recomendacao = (idade >= 11 && i % 3 === 0) ? 'Expirada/Sem' : (idade >= 11 ? 'Ativa' : 'Não se aplica');
    
    // Format dataNascimento
    const anoNasc = dataAtual.getFullYear() - idade;
    const dataNascimento = new Date(anoNasc, r.mes - 1, r.dia);

    const nomeFormatado = inverterNome(r.nome);

    try {
      await prisma.membro.upsert({
        where: { nome: nomeFormatado },
        update: {
          sexo: r.sexo,
          idade,
          dataNascimento,
          organizacao: r.org,
          focoMissao,
          precisaChamado,
          recomendacao,
          novoBatizado: (i % 10 === 0)
        },
        create: {
          nome: nomeFormatado,
          sexo: r.sexo,
          idade,
          dataNascimento,
          status,
          organizacao: r.org,
          focoMissao,
          precisaChamado,
          recomendacao,
          novoBatizado: (i % 10 === 0)
        }
      });
      count++;
    } catch (e) {
      console.error(`Erro ao inserir ${nomeFormatado}:`, e.message);
    }
  }

  console.log(`✅ Carga concluída! ${count} membros salvos no Banco de Dados.`);
}

main()
  .catch(e => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
