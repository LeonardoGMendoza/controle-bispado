import { Pool } from 'pg';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from '@prisma/client';
import CalendarioClient from './CalendarioClient';

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

export const dynamic = 'force-dynamic';

export default async function CalendarioPage() {
  // Buscar os eventos da Ala
  const eventos = await prisma.evento.findMany();
  
  // Buscar as entrevistas agendadas (incluindo nome do membro para o título)
  const entrevistas = await prisma.entrevista.findMany({
    include: {
      membro: {
        select: { nome: true }
      }
    }
  });

  // Formatar eventos no padrão do react-big-calendar
  const eventosCalendario = eventos.map(e => ({
    id: `ev_${e.id}`,
    title: e.titulo,
    start: e.inicio,
    end: e.fim,
    allDay: e.diaInteiro,
    tipo: e.tipo,
    cor: e.cor,
    descricao: e.descricao
  }));

  // Formatar entrevistas no padrão do react-big-calendar
  const entrevistasCalendario = entrevistas.map(e => {
    // Definir 30 min de duração padrão para a entrevista no calendário
    const start = e.dataHora;
    const end = new Date(start.getTime() + 30 * 60000); 

    let cor;
    switch(e.status) {
      case 'Realizada': cor = '#10B981'; break; // Verde
      case 'Faltou': cor = '#EF4444'; break;    // Vermelho
      default: cor = '#3B82F6'; break;          // Azul (Agendada)
    }

    return {
      id: `ent_${e.id}`,
      title: `Entrevista: ${e.membro?.nome || 'Membro'}`,
      start,
      end,
      allDay: false,
      tipo: 'Entrevista',
      cor,
      descricao: `Tipo: ${e.tipo} | Status: ${e.status} | Obs: ${e.observacoes || 'Nenhuma'}`
    };
  });

  const todosEventos = [...eventosCalendario, ...entrevistasCalendario];

  return <CalendarioClient eventosIniciais={todosEventos} />;
}
