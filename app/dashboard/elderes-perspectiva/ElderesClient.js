'use client';
import { useState } from 'react';
import DashLayout from '../../../components/DashLayout';

function getUrgencia(elder) {
  // Qualquer um sem sacerdócio recebe no mínimo "Média"
  if (!elder.sacerdocio && elder.idade <= 30) return 'Alta';
  if (!elder.sacerdocio) return 'Média';  // inclui 31+ anos
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

// Gráfico donut simples com SVG puro
function DonutChart({ segments, size = 120, thickness = 28 }) {
  const r = (size - thickness) / 2;
  const cx = size / 2;
  const circumference = 2 * Math.PI * r;
  let offset = 0;
  const total2 = segments.reduce((s, seg) => s + seg.valor, 0);
  if (total2 === 0) return null;
  return (
    <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
      {segments.map((seg, i) => {
        const dash = (seg.valor / total2) * circumference;
        const gap  = circumference - dash;
        const el = (
          <circle key={i} cx={cx} cy={cx} r={r}
            fill="none" stroke={seg.cor} strokeWidth={thickness}
            strokeDasharray={`${dash} ${gap}`}
            strokeDashoffset={-offset}
          />
        );
        offset += dash;
        return el;
      })}
      <text x={cx} y={cx} textAnchor="middle" dominantBaseline="middle"
        style={{ fontSize: 20, fontWeight: 900, fill: '#0f172a', transform: 'rotate(90deg)', transformOrigin: `${cx}px ${cx}px` }}>
        {total2}
      </text>
    </svg>
  );
}

export default function ElderesClient({ elderesInicial }) {
  const [filtroSacer, setFiltroSacer] = useState('Todos');
  const [filtroUrg, setFiltroUrg] = useState('Todas');
  const [busca, setBusca] = useState('');

  const total      = elderesInicial.length;
  const comSacer   = elderesInicial.filter(e => e.sacerdocio).length;
  const semSacer   = elderesInicial.filter(e => !e.sacerdocio).length;
  const altaPrior  = elderesInicial.filter(e => getUrgencia(e) === 'Alta').length;
  const jovens     = elderesInicial.filter(e => e.idade <= 30).length;

  const filtrados = elderesInicial.filter(e => {
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
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Ala Vila Jacuí (2119331) — Banco de Dados</p>
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

        {/* Gráficos */}
        <div style={{ display: 'flex', gap: 20, marginBottom: 28, flexWrap: 'wrap' }}>
          {/* Donut: Sacerdócio */}
          <div style={{ background: '#fff', borderRadius: 18, padding: '20px 28px', flex: 1, minWidth: 220, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: '#374151' }}>⛪ Sacerdócio</div>
            <DonutChart size={130} thickness={30} segments={[
              { valor: comSacer, cor: '#10B981' },
              { valor: semSacer, cor: '#EF4444' },
            ]} />
            <div style={{ display: 'flex', gap: 16, fontSize: 12 }}>
              <span><span style={{ color: '#10B981', fontWeight: 700 }}>● </span>Com ({comSacer})</span>
              <span><span style={{ color: '#EF4444', fontWeight: 700 }}>● </span>Sem ({semSacer})</span>
            </div>
          </div>

          {/* Donut: Urgência */}
          <div style={{ background: '#fff', borderRadius: 18, padding: '20px 28px', flex: 1, minWidth: 220, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: '#374151' }}>🎯 Urgência Pastoral</div>
            <DonutChart size={130} thickness={30} segments={[
              { valor: altaPrior, cor: '#EF4444' },
              { valor: elderesInicial.filter(e => getUrgencia(e) === 'Média').length, cor: '#F59E0B' },
              { valor: elderesInicial.filter(e => getUrgencia(e) === 'Normal').length, cor: '#10B981' },
            ]} />
            <div style={{ display: 'flex', gap: 12, fontSize: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <span><span style={{ color: '#EF4444', fontWeight: 700 }}>● </span>Alta ({altaPrior})</span>
              <span><span style={{ color: '#F59E0B', fontWeight: 700 }}>● </span>Média ({elderesInicial.filter(e => getUrgencia(e) === 'Média').length})</span>
              <span><span style={{ color: '#10B981', fontWeight: 700 }}>● </span>Normal ({elderesInicial.filter(e => getUrgencia(e) === 'Normal').length})</span>
            </div>
          </div>

          {/* Donut: Faixa etária */}
          <div style={{ background: '#fff', borderRadius: 18, padding: '20px 28px', flex: 1, minWidth: 220, border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 16 }}>
            <div style={{ fontWeight: 800, fontSize: 14, color: '#374151' }}>👤 Faixa Etária</div>
            <DonutChart size={130} thickness={30} segments={[
              { valor: elderesInicial.filter(e => e.idade <= 30).length, cor: '#3B82F6' },
              { valor: elderesInicial.filter(e => e.idade > 30 && e.idade <= 50).length, cor: '#8B5CF6' },
              { valor: elderesInicial.filter(e => e.idade > 50).length, cor: '#6b7280' },
            ]} />
            <div style={{ display: 'flex', gap: 10, fontSize: 12, flexWrap: 'wrap', justifyContent: 'center' }}>
              <span><span style={{ color: '#3B82F6', fontWeight: 700 }}>● </span>≤30 ({elderesInicial.filter(e => e.idade <= 30).length})</span>
              <span><span style={{ color: '#8B5CF6', fontWeight: 700 }}>● </span>31-50 ({elderesInicial.filter(e => e.idade > 30 && e.idade <= 50).length})</span>
              <span><span style={{ color: '#6b7280', fontWeight: 700 }}>● </span>51+ ({elderesInicial.filter(e => e.idade > 50).length})</span>
            </div>
          </div>
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
          Banco de Dados — Ala Vila Jacuí
        </div>
      </div>
    </DashLayout>
  );
}
