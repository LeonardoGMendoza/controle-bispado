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
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [novoTitulo, setNovoTitulo] = useState('');
  const [novaDataInicio, setNovaDataInicio] = useState('');
  const [novaDataFim, setNovaDataFim] = useState('');
  const [novoTipo, setNovoTipo] = useState('Ala');
  const [novaDescricao, setNovaDescricao] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSalvarEvento = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/eventos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          titulo: novoTitulo,
          inicio: novaDataInicio,
          fim: novaDataFim,
          tipo: novoTipo,
          descricao: novaDescricao,
          cor: novoTipo === 'Ala' ? '#8b5cf6' : 
               novoTipo === 'Liderança' ? '#f59e0b' : 
               '#ec4899' // Organizações
        })
      });
      if (res.ok) {
        window.location.reload();
      } else {
        alert("Erro ao salvar o evento.");
      }
    } catch (err) {
      alert("Erro na conexão.");
    } finally {
      setIsSubmitting(false);
    }
  };

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
      <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '100vh', backgroundColor: '#f8fafc', color: '#0f172a', fontFamily: 'Inter, Arial, sans-serif' }}>
        
        {/* Painel de Filtros (Sidebar) */}
        <div style={{ flex: '1 1 280px', maxWidth: '100%', backgroundColor: '#ffffff', padding: 24, borderRight: '1px solid #e2e8f0' }}>
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
        <div style={{ flex: '999 1 320px', padding: '24px 16px', backgroundColor: '#ffffff', overflowY: 'auto' }}>
          
          <div style={{ marginBottom: 24, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
            <div>
              <h1 style={{ fontSize: 28, fontWeight: 800, color: '#0f172a', margin: 0 }}>Planejamento Mensal</h1>
              <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Visão integrada de eventos e compromissos do Bispado</p>
            </div>
            
            <button 
              onClick={() => setIsModalOpen(true)}
              style={{ backgroundColor: '#2563eb', color: 'white', padding: '10px 16px', borderRadius: 6, fontWeight: 600, fontSize: 14, border: 'none', cursor: 'pointer', boxShadow: '0 4px 6px -1px rgba(37, 99, 235, 0.2)' }}
            >
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

      {/* Modal de Novo Evento */}
      {isModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999 }}>
          <div style={{ backgroundColor: 'white', padding: 24, borderRadius: 12, width: '90%', maxWidth: 500, boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}>
            <h2 style={{ margin: '0 0 20px 0', fontSize: 20, color: '#0f172a' }}>Novo Evento</h2>
            <form onSubmit={handleSalvarEvento} style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Título do Evento *</label>
                <input required value={novoTitulo} onChange={e => setNovoTitulo(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 14 }} />
              </div>
              <div style={{ display: 'flex', gap: 16 }}>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Início *</label>
                  <input required type="datetime-local" value={novaDataInicio} onChange={e => setNovaDataInicio(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 14 }} />
                </div>
                <div style={{ flex: 1 }}>
                  <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Fim *</label>
                  <input required type="datetime-local" value={novaDataFim} onChange={e => setNovaDataFim(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 14 }} />
                </div>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Tipo de Evento *</label>
                <select value={novoTipo} onChange={e => setNovoTipo(e.target.value)} style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 14 }}>
                  <option value="Ala">Atividade da Ala</option>
                  <option value="Liderança">Conselho/Liderança</option>
                  <option value="Moças">Moças</option>
                  <option value="Rapazes">Rapazes</option>
                  <option value="Sociedade de Socorro">Sociedade de Socorro</option>
                  <option value="Primária">Primária</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', fontSize: 13, fontWeight: 600, color: '#475569', marginBottom: 4 }}>Descrição (Opcional)</label>
                <textarea value={novaDescricao} onChange={e => setNovaDescricao(e.target.value)} rows={3} style={{ width: '100%', padding: '10px', borderRadius: 6, border: '1px solid #cbd5e1', fontSize: 14 }} />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, marginTop: 8 }}>
                <button type="button" onClick={() => setIsModalOpen(false)} style={{ padding: '10px 16px', borderRadius: 6, border: '1px solid #cbd5e1', backgroundColor: 'white', color: '#475569', fontWeight: 600, cursor: 'pointer' }}>
                  Cancelar
                </button>
                <button type="submit" disabled={isSubmitting} style={{ padding: '10px 16px', borderRadius: 6, border: 'none', backgroundColor: '#2563eb', color: 'white', fontWeight: 600, cursor: 'pointer' }}>
                  {isSubmitting ? 'Salvando...' : 'Salvar Evento'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </DashLayout>
  );
}
