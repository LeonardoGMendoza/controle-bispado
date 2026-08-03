import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import ElderesClient from './ElderesClient';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = 'force-dynamic';

export default async function ElderesPerspectivaPage() {
  const membros = await prisma.membro.findMany({
    where: {
      sexo: 'M',
      idade: { gte: 18 } // Homens com 18 anos ou mais
    },
    orderBy: { nome: 'asc' }
  });

  const elderesData = membros.map(m => {
    let sac = "";
    if (m.nome.includes("Sacerdote")) sac = "Sacerdote";
    
    return {
      nome: m.nome,
      idade: m.idade || 0,
      nascimento: m.dataNascimento ? m.dataNascimento.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }) : "Sem data",
      sacerdocio: sac 
    };
  });

  return <ElderesClient elderesInicial={elderesData} />;
}
