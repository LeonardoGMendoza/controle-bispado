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
  const membros = await prisma.membro.findMany();
  const entrevistas = await prisma.entrevista.findMany();
  const notasFiscais = await prisma.notaFiscal.findMany();

  // Processamento dos Indicadores
  const totalMembros = membros.length;
  
  // Demografia
  const jovens = membros.filter(m => m.idade < 18).length;
  const elderes = membros.filter(m => m.idade >= 18 && m.sexo === 'M').length;
  const socorro = membros.filter(m => m.idade >= 18 && m.sexo === 'F').length;

  // Entrevistas
  const entrevistasRealizadas = entrevistas.filter(e => e.status === 'Realizada').length;
  const entrevistasAgendadas = entrevistas.filter(e => e.status === 'Agendada').length;
  const entrevistasFaltou = entrevistas.filter(e => e.status === 'Faltou').length;

  // Notas Fiscais
  const notasPendentes = notasFiscais.filter(n => n.status === 'Pendente').length;
  const notasPagas = notasFiscais.filter(n => n.status === 'Pago' || n.status === 'Aprovada').length;

  const data = {
    totalMembros,
    demografia: [
      { name: 'Jovens (<18)', value: jovens, fill: '#3B82F6' },
      { name: 'Élderes/Sacerdócio', value: elderes, fill: '#F59E0B' },
      { name: 'Soc. Socorro', value: socorro, fill: '#D94F8A' }
    ],
    entrevistasStatus: [
      { name: 'Realizadas', value: entrevistasRealizadas, fill: '#10B981' },
      { name: 'Agendadas', value: entrevistasAgendadas, fill: '#3B82F6' },
      { name: 'Faltou', value: entrevistasFaltou, fill: '#EF4444' }
    ],
    notasResumo: {
      pendentes: notasPendentes,
      pagas: notasPagas,
      totalMes: notasFiscais.filter(n => new Date(n.dataEmissao).getMonth() === new Date().getMonth()).reduce((acc, curr) => acc + curr.valor, 0)
    }
  };

  return <IndicadoresClient data={data} />;
}
