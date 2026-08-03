import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import { NextResponse } from 'next/server';
import { membrosReais, inverterNome } from '../../dashboard/indicadores/mockData.js';

export async function GET() {
  try {
    const pool = new Pool({ connectionString: process.env.DATABASE_URL });
    const adapter = new PrismaPg(pool);
    const prisma = new PrismaClient({ adapter });

    let count = 0;
    for (const m of membrosReais) {
      const dataNasc = new Date();
      dataNasc.setFullYear(dataNasc.getFullYear() - (m.idade || 0));
      dataNasc.setMonth(m.mes - 1);
      dataNasc.setDate(m.dia);
      dataNasc.setHours(0, 0, 0, 0);

      await prisma.membro.upsert({
        where: { nome: inverterNome(m.nome) },
        update: {
          sexo: m.sexo,
          idade: m.idade || 0,
          dataNascimento: dataNasc,
          organizacao: m.organizacao || 'Não informada',
          focoMissao: m.focoMissao || 'Não se aplica',
          precisaChamado: m.precisaChamado || 'Não',
          recomendacao: m.recomendacao || 'Não se aplica',
          novoBatizado: m.novoBatizado || false
        },
        create: {
          nome: inverterNome(m.nome),
          sexo: m.sexo,
          idade: m.idade || 0,
          dataNascimento: dataNasc,
          status: m.status || 'Ativo',
          organizacao: m.organizacao || 'Não informada',
          focoMissao: m.focoMissao || 'Não se aplica',
          precisaChamado: m.precisaChamado || 'Não',
          recomendacao: m.recomendacao || 'Não se aplica',
          novoBatizado: m.novoBatizado || false
        }
      });
      count++;
    }

    return NextResponse.json({ success: true, message: `Carga concluída com sucesso! ${count} membros foram salvos no Banco de Dados.` });
  } catch (error) {
    console.error('Erro no seed automático:', error);
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
