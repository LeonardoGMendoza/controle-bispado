import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import IndicadoresClient from './IndicadoresClient';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = 'force-dynamic';

export default async function IndicadoresPage() {
  // Buscar os dados brutos no banco para calcular os indicadores
  const membrosBrutos = await prisma.membro.findMany();
  const entrevistasBrutas = await prisma.entrevista.findMany();
  const notasFiscaisBrutas = await prisma.notaFiscal.findMany();

  // Vamos mapear os dados para o Client fazer os filtros cruzados (Cross-filtering)
  // Como o banco ainda não tem todos os campos (missão, chamado), vamos simular alguns 
  // comportamentos baseados na idade para o Bispo já poder ver a arquitetura funcionando!
  const membros = membrosBrutos.map(m => {
    // Simulações estratégicas para o MVP do Dashboard
    const mesAtual = new Date().getMonth();
    const mesNasc = m.dataNascimento ? m.dataNascimento.getMonth() : -1;
    const isAniversariante = mesNasc === mesAtual;
    
    // Simula quem está evoluindo (ex: maioria evolui, alguns precisam de ajuda)
    const statusEvolucao = (m.id % 5 === 0) ? 'Precisa de Ajuda' : 'Evoluindo';
    
    // Simula quem vai pra missão (até 25, solteiro, sem filhos)
    const focoMissao = (m.idade >= 17 && m.idade <= 25) ? 'Preparação Missão (Até 25 anos)' : 'Não se aplica';
    
    // Simula chamado (1 em cada 4 não tem chamado)
    const precisaChamado = (m.id % 4 === 0) ? 'Sim' : 'Não';
    
    // Simula recomendação (Membros acima de 12 anos)
    const recomendacao = (m.idade >= 11 && m.id % 3 === 0) ? 'Expirada/Sem' : (m.idade >= 11 ? 'Ativa' : 'Não se aplica');

    // Regra Doutrinária de Sacerdócio: Somente Homens a partir de 11 anos
    let sacerdocio = 'Não se aplica (Mulheres)';
    if (m.sexo === 'M') {
      if (m.idade >= 18) sacerdocio = (m.id % 5 === 0) ? 'Sem Sacerdócio' : 'Élder';
      else if (m.idade >= 16) sacerdocio = 'Sacerdote';
      else if (m.idade >= 14) sacerdocio = 'Mestre';
      else if (m.idade >= 11) sacerdocio = 'Diácono';
      else sacerdocio = 'Sem Sacerdócio (<11 anos)';
    }

    return {
      id: m.id,
      nome: m.nome,
      sexo: m.sexo,
      idade: m.idade || 0,
      dataNascimento: m.dataNascimento,
      aniversariante: isAniversariante,
      statusEvolucao,
      focoMissao,
      precisaChamado,
      recomendacao,
      sacerdocio,
      novoBatizado: (m.id % 10 === 0) // simula 10% de conversos recentes
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
