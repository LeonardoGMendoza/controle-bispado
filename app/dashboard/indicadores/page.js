import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import IndicadoresClient from './IndicadoresClient';
import { membrosReais, inverterNome } from './mockData';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = 'force-dynamic';

export default async function IndicadoresPage() {
  
  // 1. Busca os membros reais que foram importados para o Banco de Dados (PostgreSQL) via Prisma!
  const membrosBanco = await prisma.membro.findMany({
    orderBy: { nome: 'asc' }
  });

  const entrevistasBrutas = await prisma.entrevista.findMany();
  const notasFiscaisBrutas = await prisma.notaFiscal.findMany();

  // 2. Mapeamos os dados para o padrão que o Client (React) espera
  const dataAtual = new Date();
  const mesAtual = dataAtual.getMonth() + 1; // 1 a 12

  const membros = membrosBanco.map((m) => {
    // Calculamos o aniversário com base no dataNascimento armazenado
    let isAniversariante = false;
    if (m.dataNascimento) {
      const mesNasc = m.dataNascimento.getMonth() + 1;
      isAniversariante = (mesNasc === mesAtual);
    }

    // Usamos os campos que agora existem de verdade no banco!
    return {
      id: m.id,
      nome: m.nome,
      sexo: m.sexo,
      idade: m.idade || 0,
      dataNascimento: m.dataNascimento ? m.dataNascimento.toISOString() : null,
      aniversariante: isAniversariante,
      statusEvolucao: m.status === 'Ativo' ? 'Evoluindo' : m.status, // Mapeamento básico
      focoMissao: m.focoMissao,
      precisaChamado: m.precisaChamado,
      recomendacao: m.recomendacao,
      organizacao: m.organizacao,
      novoBatizado: m.novoBatizado
    };
  });

  const entrevistas = entrevistasBrutas.map(e => ({
    id: e.id,
    status: e.status
  }));

  const notas = notasFiscaisBrutas.map(n => ({
    id: n.id,
    status: n.status,
    valor: n.valor,
    data: n.dataEmissao
  }));

  return <IndicadoresClient membros={membros} entrevistas={entrevistas} notas={notas} />;
}
