'use client';
import { useState } from 'react';
import DashLayout from '../../../components/DashLayout';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import { ptBR } from 'date-fns/locale';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const locales = {
  'pt-BR': ptBR,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Customizações de mensagens para Português
const messages = {
  allDay: 'Dia Inteiro',
  previous: 'Anterior',
  next: 'Próximo',
  today: 'Hoje',
  month: 'Mês',
  week: 'Semana',
  day: 'Dia',
  agenda: 'Agenda',
  date: 'Data',
  time: 'Hora',
  event: 'Evento',
  noEventsInRange: 'Não há eventos neste período.',
  showMore: total => `+ Ver mais (${total})`
};

export default function CalendarioClient({ eventosIniciais }) {
  const [eventos] = useState(eventosIniciais);
  
  // Filtros de Tipo de Evento
  const [filtroEntrevistas, setFiltroEntrevistas] = useState(true);
  const [filtroAla, setFiltroAla] = useState(true);
  const [filtroLideranca, setFiltroLideranca] = useState(true);
  const [filtroOrganizacoes, setFiltroOrganizacoes] = useState(true);

  // Cross-filtering
  const eventosFiltrados = eventos.filter(e => {
    if (e.tipo === 'Entrevista' && !filtroEntrevistas) return false;
    if (e.tipo === 'Ala' && !filtroAla) return false;
    if (e.tipo === 'Liderança' && !filtroLideranca) return false;
    if (['Moças', 'Rapazes', 'Sociedade de Socorro', 'Quórum de Élderes', 'Primária'].includes(e.tipo) && !filtroOrganizacoes) return false;
    return true;
  });

  // Estilização dinâmica baseada na cor do evento
  const eventStyleGetter = (event) => {
    const backgroundColor = event.cor || '#0ea5e9'; // Cor padrão caso não tenha
    return {
      style: {
        backgroundColor,
        borderRadius: '5px',
        opacity: 0.9,
        color: 'white',
        border: '0px',
        display: 'block',
        fontSize: '12px',
        fontWeight: 'bold',
        padding: '2px 5px'
      }
    };
  };

  return (
    <DashLayout>
      <div style={{ display: 'flex', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'Inter, Arial, sans-serif' }}>
        
        {/* Painel de Filtros (Sidebar) */}
        <div style={{ width: 280, backgroundColor: '#ffffff', padding: 24, borderRight: '1px solid #e2e8f0' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8, color: '#0f172a' }}>
            📅 Calendário da Ala
          </h2>
          <p style={{ fontSize: 13, color: '#64748b', marginBottom: 32 }}>Filtre as atividades e entrevistas para visualizar no painel.</p>

          <h3 style={{ fontSize: 14, fontWeight: 700, color: '#334155', marginBottom: 16 }}>Tipos de Eventos</h3>

          {/* Entrevistas */}
          <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" checked={filtroEntrevistas} onChange={e => setFiltroEntrevistas(e.target.checked)} id="filtroEntrevistas" style={{ accentColor: '#3b82f6', width: 16, height: 16 }} />
            <label htmlFor="filtroEntrevistas" style={{ fontSize: 13, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, backgroundColor: '#3b82f6', borderRadius: '50%' }}></div>
              Entrevistas (Agendadas)
            </label>
          </div>

          {/* Ala Geral */}
          <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" checked={filtroAla} onChange={e => setFiltroAla(e.target.checked)} id="filtroAla" style={{ accentColor: '#8b5cf6', width: 16, height: 16 }} />
            <label htmlFor="filtroAla" style={{ fontSize: 13, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, backgroundColor: '#8b5cf6', borderRadius: '50%' }}></div>
              Atividades da Ala
            </label>
          </div>

          {/* Liderança */}
          <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" checked={filtroLideranca} onChange={e => setFiltroLideranca(e.target.checked)} id="filtroLideranca" style={{ accentColor: '#f59e0b', width: 16, height: 16 }} />
            <label htmlFor="filtroLideranca" style={{ fontSize: 13, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, backgroundColor: '#f59e0b', borderRadius: '50%' }}></div>
              Conselhos e Liderança
            </label>
          </div>

          {/* Organizações */}
          <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" checked={filtroOrganizacoes} onChange={e => setFiltroOrganizacoes(e.target.checked)} id="filtroOrganizacoes" style={{ accentColor: '#ec4899', width: 16, height: 16 }} />
            <label htmlFor="filtroOrganizacoes" style={{ fontSize: 13, color: '#475569', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 6 }}>
              <div style={{ width: 12, height: 12, backgroundColor: '#ec4899', borderRadius: '50%' }}></div>
              Organizações (Moças, RS, etc)
            </label>
          </div>

          <div style={{ padding: 16, backgroundColor: '#f1f5f9', borderRadius: 8, marginTop: 40 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>Dica do Sistema</div>
            <div style={{ fontSize: 12, color: '#64748b', marginTop: 4 }}>
              As entrevistas que você agenda na aba "Entrevistas" aparecem automaticamente aqui!
            </div>
          </div>
        </div>

        {/* Área do Calendário (react-big-calendar) */}
        <div style={{ flex: 1, padding: '32px 40px', backgroundColor: '#ffffff', overflowY: 'auto' }}>
          
          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: 0 }}>Planejamento Mensal</h1>
              <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Visão integrada de eventos e compromissos do Bispado</p>
            </div>
            
            <button style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 16px', borderRadius: 6, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}>
              + Novo Evento
            </button>
          </div>

          {/* O componente do Calendário */}
          <div style={{ height: '75vh', backgroundColor: 'white', borderRadius: 12, border: '1px solid #e2e8f0', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)', padding: 16 }}>
            <Calendar
              localizer={localizer}
              events={eventosFiltrados}
              startAccessor="start"
              endAccessor="end"
              style={{ height: '100%' }}
              culture="pt-BR"
              messages={messages}
              eventPropGetter={eventStyleGetter}
              popup
              onSelectEvent={(event) => alert(event.descricao || event.title)}
            />
          </div>

        </div>
      </div>
    </DashLayout>
  );
}
