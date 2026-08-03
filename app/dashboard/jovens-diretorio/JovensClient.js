'use client';
import { useState } from 'react';
import DashLayout from '../../../components/DashLayout';

function JovemCard({ j }) {
  const isM       = j.sexo === 'M';
  const corBorda  = isM ? '#3B82F6' : '#D94F8A';
  const corAvatar = isM ? '3B82F6'  : 'D94F8A';
  const bgTag     = isM ? '#dbeafe' : '#fce7f3';
  const corTag    = isM ? '#1d4ed8' : '#9d174d';
  const emojiSexo = isM ? '👦 Rapaz' : '👧 Moça';
  const first     = j.nome.split(',')[0].trim().replace(' ', '+');
  const avatar    = `https://ui-avatars.com/api/?name=${first}&background=${corAvatar}&color=fff&size=100&bold=true`;

  const contato = [j.tel && `📞 ${j.tel}`, j.email && `✉️ ${j.email}`].filter(Boolean).join('  ·  ') || 'Sem contato';

  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: '16px 18px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', display: 'flex', gap: 14, alignItems: 'flex-start', borderLeft: `3px solid ${corBorda}` }}>
      <img src={avatar} alt="" style={{ width: 48, height: 48, borderRadius: '50%', border: `2px solid ${corBorda}`, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>
          {j.nome}
          {!j.batizado && <span style={{ background: '#fef3c7', color: '#92400e', borderRadius: 6, padding: '1px 7px', fontSize: 11, fontWeight: 700, marginLeft: 8 }}>Não Batizado</span>}
        </div>
        <div style={{ fontSize: 12, color: '#6b7280', margin: '4px 0' }}>
          <span style={{ background: bgTag, color: corTag, borderRadius: 8, padding: '1px 8px', fontWeight: 700, fontSize: 11 }}>{emojiSexo}</span>
          &nbsp;·&nbsp; {j.idade} anos &nbsp;·&nbsp; {j.nasc}
        </div>
        <div style={{ fontSize: 12, color: '#374151' }}>{contato}</div>
      </div>
    </div>
  );
}

export default function JovensClient({ jovensInicial }) {
  const [mostrar, setMostrar] = useState('Todos');
  const [busca, setBusca]     = useState('');

  const total     = jovensInicial.length;
  const nRap      = jovensInicial.filter(j => j.sexo === 'M').length;
  const nMoc      = jovensInicial.filter(j => j.sexo === 'F').length;
  const nNB       = jovensInicial.filter(j => !j.batizado).length;
  const nContato  = jovensInicial.filter(j => j.tel || j.email).length;

  let vis = jovensInicial;
  if (mostrar === 'Rapazes')       vis = vis.filter(j => j.sexo === 'M');
  else if (mostrar === 'Moças')    vis = vis.filter(j => j.sexo === 'F');
  else if (mostrar === 'Não Batizados') vis = vis.filter(j => !j.batizado);
  if (busca) vis = vis.filter(j => j.nome.toLowerCase().includes(busca.toLowerCase()));

  const rapazes = vis.filter(j => j.sexo === 'M');
  const mocas   = vis.filter(j => j.sexo === 'F');

  const kpis = [
    { label: 'Total de Jovens',  valor: total,    cor: '#D94F8A', sub: 'no diretório' },
    { label: 'Rapazes',          valor: nRap,     cor: '#3B82F6', sub: 'sacerdócio aarônico' },
    { label: 'Moças',            valor: nMoc,     cor: '#D94F8A', sub: 'organização das moças' },
    { label: 'Com Contato',      valor: nContato, cor: '#10B981', sub: 'tel ou e-mail' },
    { label: 'Não Batizados',    valor: nNB,      cor: '#F59E0B', sub: 'oportunidade pastoral' },
  ];

  return (
    <DashLayout>
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '32px 40px', fontFamily: 'Arial, sans-serif' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', margin: 0 }}>🌟 Jovens — Diretório de Membros</h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Ala Vila Jacuí (2119331) — Banco de Dados</p>
        </div>

        {/* Banner */}
        <div style={{ background: 'linear-gradient(135deg,#fdf2f8,#fffbeb)', borderLeft: '4px solid #F59E0B', borderRadius: 12, padding: '14px 18px', marginBottom: 24, fontSize: 14, color: '#374151' }}>
          <strong style={{ color: '#D94F8A' }}>💛 Cuidando dos nossos jovens:</strong> O bispado acompanha com amor cada rapaz e moça.
          Temos <strong>{nNB} não-batizado(s)</strong> — uma oportunidade especial de convite e cuidado pastoral.
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
        <div style={{ display: 'flex', gap: 14, marginBottom: 24, flexWrap: 'wrap' }}>
          {['Todos', 'Rapazes', 'Moças', 'Não Batizados'].map(op => (
            <button key={op} onClick={() => setMostrar(op)}
              style={{ padding: '8px 18px', borderRadius: 20, border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: 13,
                background: mostrar === op ? '#D94F8A' : '#fff',
                color: mostrar === op ? '#fff' : '#374151',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)' }}>
              {op}
            </button>
          ))}
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="🔍 Buscar por nome..."
            style={{ padding: '8px 14px', borderRadius: 20, border: '1px solid #e2e8f0', fontSize: 13, flex: 1, minWidth: 200 }} />
        </div>

        {/* Rapazes */}
        {rapazes.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16, marginTop: 8 }}>
              <h2 style={{ margin: 0, color: '#3B82F6', fontSize: 20, fontWeight: 800 }}>👦 Rapazes</h2>
              <span style={{ background: '#3B82F6', color: '#fff', borderRadius: 20, padding: '2px 12px', fontSize: 13, fontWeight: 700 }}>{rapazes.length}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12, marginBottom: 32 }}>
              {rapazes.map((j, i) => <JovemCard key={i} j={j} />)}
            </div>
          </>
        )}

        {/* Moças */}
        {mocas.length > 0 && (
          <>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <h2 style={{ margin: 0, color: '#D94F8A', fontSize: 20, fontWeight: 800 }}>👧 Moças</h2>
              <span style={{ background: '#D94F8A', color: '#fff', borderRadius: 20, padding: '2px 12px', fontSize: 13, fontWeight: 700 }}>{mocas.length}</span>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12, marginBottom: 32 }}>
              {mocas.map((j, i) => <JovemCard key={i} j={j} />)}
            </div>
          </>
        )}

        {rapazes.length === 0 && mocas.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>Nenhum jovem encontrado com os filtros selecionados.</div>
        )}

        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12, marginTop: 24 }}>
          Banco de Dados — Ala Vila Jacuí
        </div>
      </div>
    </DashLayout>
  );
}
