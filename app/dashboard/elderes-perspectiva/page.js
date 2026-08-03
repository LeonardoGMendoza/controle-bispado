'use client';
import { useState } from 'react';
import DashLayout from '../../../components/DashLayout';

const ELDERES = [
  { nome: "Cardoso, Arthur Batista",          idade: 21, nascimento: "12 jul 2005", sacerdocio: "Sacerdote" },
  { nome: "Colón Machado, Javier Antonio",    idade: 22, nascimento: "12 abr 2004", sacerdocio: "Sacerdote" },
  { nome: "Correa Machado, Jose Anyer",       idade: 23, nascimento: "12 jan 2003", sacerdocio: "Sacerdote" },
  { nome: "Costa, Rodrigo Soares",            idade: 19, nascimento: "19 mai 2007", sacerdocio: "Mestre" },
  { nome: "De Freitas, Deberson",             idade: 52, nascimento: "29 jan 1974", sacerdocio: "" },
  { nome: "Dos Santos, Luiz Carlos De Lima",  idade: 39, nascimento: "9 dez 1986",  sacerdocio: "" },
  { nome: "Ferreira Melchior, Guilherme",     idade: 20, nascimento: "29 jan 2006", sacerdocio: "" },
  { nome: "Herrera Pinaicobo, Juan",          idade: 20, nascimento: "31 mai 2006", sacerdocio: "Sacerdote" },
  { nome: "Laranjeira, Francisco Fernandes",  idade: 59, nascimento: "6 mar 1967",  sacerdocio: "" },
  { nome: "Lima, Efraim Batista de",          idade: 57, nascimento: "19 set 1968", sacerdocio: "" },
  { nome: "Lima, Matheus Oliveira de",        idade: 26, nascimento: "12 mai 2000", sacerdocio: "Diácono" },
  { nome: "Magnavita, Leandro Lopes de Souza",idade: 45, nascimento: "4 fev 1981",  sacerdocio: "Sacerdote" },
  { nome: "Magnavita, Rafael Lopes de Souza", idade: 40, nascimento: "14 abr 1986", sacerdocio: "Sacerdote" },
  { nome: "Magnavita, Rodrigo Lopes de Souza",idade: 40, nascimento: "14 abr 1986", sacerdocio: "Sacerdote" },
  { nome: "Mota De Freitas, Guilherme",       idade: 26, nascimento: "10 set 1999", sacerdocio: "" },
  { nome: "Müller Junior, Emerson",           idade: 26, nascimento: "26 dez 1999", sacerdocio: "" },
  { nome: "Narciso, Jeshus Ricardo",          idade: 67, nascimento: "17 mar 1959", sacerdocio: "" },
  { nome: "Neres Francelino, Alvaro",         idade: 20, nascimento: "1 jul 2006",  sacerdocio: "Sacerdote" },
  { nome: "Oliveira, Marcelo Ferreira de",    idade: 54, nascimento: "11 jun 1972", sacerdocio: "Sacerdote" },
  { nome: "Oliveira, Mateus Rodrigues de",    idade: 24, nascimento: "28 ago 2001", sacerdocio: "" },
  { nome: "Rangel, Ronaldo Romero Soares",    idade: 68, nascimento: "24 mar 1958", sacerdocio: "Sacerdote" },
  { nome: "Ribeiro Dias, Douglas",            idade: 46, nascimento: "30 out 1979", sacerdocio: "" },
  { nome: "Santos, Clayton Trindade dos",     idade: 30, nascimento: "6 out 1995",  sacerdocio: "Sacerdote" },
  { nome: "Santos, Douglas Maques dos",       idade: 25, nascimento: "11 out 2000", sacerdocio: "" },
  { nome: "Santos, Elias Cardoso Da Silva",   idade: 56, nascimento: "13 ago 1969", sacerdocio: "" },
  { nome: "Santos, Marcelo Dos",              idade: 56, nascimento: "14 dez 1969", sacerdocio: "" },
  { nome: "Santos, Ygor Marques dos",         idade: 21, nascimento: "10 out 2004", sacerdocio: "" },
  { nome: "Sato, Rodrigo Santana",            idade: 45, nascimento: "5 jul 1981",  sacerdocio: "Sacerdote" },
  { nome: "Silva, Andrew Oliveira Da",        idade: 25, nascimento: "19 abr 2001", sacerdocio: "Sacerdote" },
  { nome: "Silva, Daniel Rony Farias",        idade: 24, nascimento: "18 abr 2002", sacerdocio: "Mestre" },
  { nome: "Silva, Geraldo Jose da",           idade: 64, nascimento: "8 fev 1962",  sacerdocio: "Sacerdote" },
  { nome: "Silva, Laércio Alberto Da",        idade: 51, nascimento: "25 fev 1975", sacerdocio: "" },
  { nome: "Silva, Patricio Aparecido Da",     idade: 48, nascimento: "31 jul 1978", sacerdocio: "" },
  { nome: "Sousa, Lucas Cleto de",            idade: 21, nascimento: "1 out 2004",  sacerdocio: "Sacerdote" },
  { nome: "Souza, Allan Gregory Bezerra de",  idade: 36, nascimento: "13 set 1989", sacerdocio: "Sacerdote" },
];

function getUrgencia(elder) {
  if (!elder.sacerdocio && elder.idade <= 30) return 'Alta';
  if (!elder.sacerdocio && elder.idade <= 45) return 'Média';
  return 'Normal';
}

function SacerdocioBadge({ valor }) {
  const styles = {
    'Sacerdote': { bg: '#dbeafe', color: '#1d4ed8' },
    'Mestre':    { bg: '#d1fae5', color: '#065f46' },
    'Diácono':   { bg: '#fef3c7', color: '#92400e' },
    '':          { bg: '#f3f4f6', color: '#6b7280' },
  };
  const s = styles[valor] || styles[''];
  return (
    <span style={{ background: s.bg, color: s.color, borderRadius: 10, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>
      {valor || 'Sem registro'}
    </span>
  );
}

function UrgenciaBadge({ valor }) {
  const map = {
    'Alta':   { bg: '#fee2e2', color: '#991b1b', emoji: '🔴' },
    'Média':  { bg: '#fef3c7', color: '#92400e', emoji: '🟡' },
    'Normal': { bg: '#d1fae5', color: '#065f46', emoji: '🟢' },
  };
  const s = map[valor] || map['Normal'];
  return (
    <span style={{ background: s.bg, color: s.color, borderRadius: 10, padding: '2px 10px', fontSize: 12, fontWeight: 700 }}>
      {s.emoji} {valor}
    </span>
  );
}

export default function ElderesPerspectiva() {
  const [filtroSacer, setFiltroSacer] = useState('Todos');
  const [filtroUrg, setFiltroUrg] = useState('Todas');
  const [busca, setBusca] = useState('');

  const total      = ELDERES.length;
  const comSacer   = ELDERES.filter(e => e.sacerdocio).length;
  const semSacer   = ELDERES.filter(e => !e.sacerdocio).length;
  const altaPrior  = ELDERES.filter(e => getUrgencia(e) === 'Alta').length;
  const jovens     = ELDERES.filter(e => e.idade <= 30).length;

  const filtrados = ELDERES.filter(e => {
    const urg = getUrgencia(e);
    if (filtroSacer === 'Sem sacerdócio' && e.sacerdocio) return false;
    if (filtroSacer !== 'Todos' && filtroSacer !== 'Sem sacerdócio' && e.sacerdocio !== filtroSacer) return false;
    if (filtroUrg !== 'Todas' && urg !== filtroUrg) return false;
    if (busca && !e.nome.toLowerCase().includes(busca.toLowerCase())) return false;
    return true;
  });

  const kpis = [
    { label: 'Total', valor: total,     cor: '#D94F8A', sub: 'em perspectiva' },
    { label: 'Com Sacerdócio', valor: comSacer,  cor: '#10B981', sub: 'registrado' },
    { label: 'Sem Sacerdócio', valor: semSacer,  cor: '#EF4444', sub: 'precisam atenção' },
    { label: 'Alta Prioridade', valor: altaPrior, cor: '#F59E0B', sub: '18-30 s/ sacerd.' },
    { label: 'Jovens ≤30 anos', valor: jovens,    cor: '#3B82F6', sub: 'faixa élder' },
  ];

  return (
    <DashLayout>
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '32px 40px', fontFamily: 'Arial, sans-serif' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', margin: 0 }}>📋 Élderes em Perspectiva</h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Ala Vila Jacuí (2119331) — Fonte: LCR</p>
        </div>

        {/* Banner */}
        <div style={{ background: 'linear-gradient(135deg,#fdf2f8,#eff6ff)', borderLeft: '4px solid #D94F8A', borderRadius: 12, padding: '14px 18px', marginBottom: 24, fontSize: 14, color: '#374151' }}>
          <strong style={{ color: '#D94F8A' }}>⛪ Missão do Bispado:</strong> Acompanhar com amor cada homem em perspectiva, ajudando-os a avançar no sacerdócio.
          Atualmente temos <strong>{semSacer} membros sem sacerdócio registrado</strong> que necessitam atenção pastoral.
        </div>

        {/* KPIs */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 28, flexWrap: 'wrap' }}>
          {kpis.map(k => (
            <div key={k.label} style={{ background: '#fff', borderRadius: 16, padding: '18px 22px', flex: 1, minWidth: 130, textAlign: 'center', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)' }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: .4 }}>{k.label}</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: k.cor, lineHeight: 1, margin: '6px 0' }}>{k.valor}</div>
              <div style={{ fontSize: 11, color: '#9ca3af' }}>{k.sub}</div>
            </div>
          ))}
        </div>

        {/* Filtros */}
        <div style={{ display: 'flex', gap: 14, marginBottom: 20, flexWrap: 'wrap' }}>
          <select value={filtroSacer} onChange={e => setFiltroSacer(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, flex: 1, minWidth: 160 }}>
            {['Todos','Sacerdote','Mestre','Diácono','Sem sacerdócio'].map(o => <option key={o}>{o}</option>)}
          </select>
          <select value={filtroUrg} onChange={e => setFiltroUrg(e.target.value)}
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, flex: 1, minWidth: 160 }}>
            {['Todas','Alta','Média','Normal'].map(o => <option key={o}>{o}</option>)}
          </select>
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="🔍 Buscar por nome..."
            style={{ padding: '8px 12px', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: 14, flex: 2, minWidth: 200 }} />
        </div>

        {/* Tabela */}
        <div style={{ background: '#fff', borderRadius: 18, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', overflow: 'hidden' }}>
          {/* Header count */}
          <div style={{ padding: '14px 20px', borderBottom: '1px solid #f1f5f9', display: 'flex', alignItems: 'center', gap: 12 }}>
            <span style={{ fontWeight: 800, fontSize: 16 }}>Lista de Membros</span>
            <span style={{ background: '#D94F8A', color: '#fff', borderRadius: 20, padding: '2px 12px', fontSize: 13, fontWeight: 700 }}>{filtrados.length} de {total}</span>
          </div>

          {/* Thead */}
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr 1fr', background: '#f8fafc', padding: '10px 20px', fontSize: 11, fontWeight: 700, color: '#6b7280', textTransform: 'uppercase', letterSpacing: .5 }}>
            <span>Nome</span><span>Idade</span><span>Nascimento</span><span>Sacerdócio</span><span>Prioridade</span>
          </div>

          {/* Rows */}
          {filtrados.map((e, i) => {
            const first = e.nome.split(',')[0].trim().replace(' ', '+');
            const avatar = `https://ui-avatars.com/api/?name=${first}&background=random&size=64&bold=true`;
            return (
              <div key={i} style={{ display: 'grid', gridTemplateColumns: '2fr 0.5fr 1fr 1fr 1fr', padding: '11px 20px', borderBottom: '1px solid #f1f5f9', alignItems: 'center', fontSize: 13 }}
                onMouseEnter={ev => ev.currentTarget.style.background = '#fafafa'}
                onMouseLeave={ev => ev.currentTarget.style.background = 'transparent'}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <img src={avatar} alt="" style={{ width: 34, height: 34, borderRadius: '50%' }} />
                  <span style={{ fontWeight: 600 }}>{e.nome}</span>
                </div>
                <span style={{ background: '#eff6ff', color: '#1d4ed8', borderRadius: 8, padding: '2px 8px', fontSize: 12, fontWeight: 700 }}>{e.idade}</span>
                <span style={{ color: '#6b7280' }}>{e.nascimento}</span>
                <SacerdocioBadge valor={e.sacerdocio} />
                <UrgenciaBadge valor={getUrgencia(e)} />
              </div>
            );
          })}
        </div>

        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12, marginTop: 24 }}>
          Fonte: LCR — lcr.churchofjesuschrist.org | Ala Vila Jacuí (2119331) | Agosto 2026
        </div>
      </div>
    </DashLayout>
  );
}
