import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import SocorroClient from './SocorroClient';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = 'force-dynamic';

export default async function SocorroDiretorioPage() {
  const membros = await prisma.membro.findMany({
    where: {
      sexo: 'F',
      idade: { gte: 18 } // Mulheres com 18 anos ou mais
    },
    orderBy: { nome: 'asc' }
  });

  const socorroData = membros.map(m => {
    return {
      nome: m.nome,
      idade: m.idade || 0,
      nasc: m.dataNascimento ? m.dataNascimento.toLocaleDateString('pt-BR', { day: 'numeric', month: 'short', year: 'numeric' }) : "Sem data",
      tel: m.telefone || "",
      email: m.email || ""
    };
  });

  return <SocorroClient irmasInicial={socorroData} />;
}
