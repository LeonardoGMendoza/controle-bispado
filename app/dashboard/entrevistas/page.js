"use client"
import React, { useState, useEffect } from 'react';
import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { format, parse, startOfWeek, getDay } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import Select from 'react-select';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import styles from './page.module.css';

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

export default function Entrevistas() {
  const [events, setEvents] = useState([]);
  const [membros, setMembros] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  
  const [selectedMembro, setSelectedMembro] = useState(null);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('09:00');
  const [tipo, setTipo] = useState('Renovação de Recomendação');
  
  useEffect(() => {
    fetchEntrevistas();
    fetchMembros();
  }, []);

  const fetchEntrevistas = async () => {
    const res = await fetch('/api/entrevistas');
    if(res.ok) {
      const data = await res.json();
      const formatted = data.map(e => ({
        id: e.id,
        title: `${e.membro.nome} - ${e.tipo}`,
        start: new Date(e.dataHora),
        end: new Date(new Date(e.dataHora).getTime() + 30*60000), // 30 min duration
        resource: e
      }));
      setEvents(formatted);
    }
  };

  const fetchMembros = async () => {
    const res = await fetch('/api/membros');
    if(res.ok) {
      const data = await res.json();
      setMembros(data.map(m => ({ value: m.id, label: m.nome })));
    }
  };

  const handleSelectSlot = ({ start }) => {
    setSelectedDate(format(start, 'yyyy-MM-dd'));
    setSelectedTime(format(start, 'HH:mm'));
    setModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!selectedMembro || !selectedDate || !selectedTime) return alert("Preencha todos os campos.");
    
    const dataHora = new Date(`${selectedDate}T${selectedTime}:00`);
    
    const res = await fetch('/api/entrevistas', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        membroId: selectedMembro.value,
        dataHora: dataHora.toISOString(),
        tipo
      })
    });
    
    if(res.ok) {
      setModalOpen(false);
      setSelectedMembro(null);
      fetchEntrevistas();
    } else {
      alert("Erro ao salvar.");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <div>
          <h1 className={styles.title}>Agenda do Bispado</h1>
          <p className={styles.subtitle}>Gerencie as entrevistas e acompanhamentos.</p>
        </div>
        <button className={styles.button} onClick={() => {
          setSelectedDate(format(new Date(), 'yyyy-MM-dd'));
          setModalOpen(true);
        }}>
          + Novo Agendamento
        </button>
      </div>

      <div className={styles.calendarWrapper}>
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          culture="pt-BR"
          selectable
          onSelectSlot={handleSelectSlot}
          messages={{
            next: "Próximo",
            previous: "Anterior",
            today: "Hoje",
            month: "Mês",
            week: "Semana",
            day: "Dia"
          }}
          style={{ height: '100%' }}
        />
      </div>

      {modalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <h2>Agendar Entrevista</h2>
            <form onSubmit={handleSubmit} className={styles.form}>
              <div className={styles.formGroup}>
                <label>Selecione o Membro</label>
                <Select 
                  options={membros} 
                  value={selectedMembro}
                  onChange={setSelectedMembro}
                  placeholder="Buscar membro..."
                  isSearchable
                  className={styles.reactSelect}
                />
              </div>
              
              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label>Data</label>
                  <input type="date" className={styles.input} value={selectedDate} onChange={e => setSelectedDate(e.target.value)} required />
                </div>
                <div className={styles.formGroup}>
                  <label>Hora</label>
                  <input type="time" className={styles.input} value={selectedTime} onChange={e => setSelectedTime(e.target.value)} required />
                </div>
              </div>
              
              <div className={styles.formGroup}>
                <label>Tipo de Entrevista</label>
                <select className={styles.input} value={tipo} onChange={e => setTipo(e.target.value)}>
                  <option value="Renovação de Recomendação">Renovação de Recomendação</option>
                  <option value="Acerto de Dízimo">Acerto de Dízimo</option>
                  <option value="Avanço de Sacerdócio/Moças">Avanço de Sacerdócio/Moças</option>
                  <option value="Chamado">Chamado</option>
                  <option value="Aconselhamento">Aconselhamento</option>
                  <option value="Outros">Outros</option>
                </select>
              </div>

              <div className={styles.modalActions}>
                <button type="button" onClick={() => setModalOpen(false)} className={styles.cancelButton}>Cancelar</button>
                <button type="submit" className={styles.submitButton}>Salvar Agendamento</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
