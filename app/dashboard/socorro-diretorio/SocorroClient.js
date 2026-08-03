'use client';
import { useState } from 'react';
import DashLayout from '../../../components/DashLayout';

function IrmaCard({ irma }) {
  const first = irma.nome.split(',')[0].trim().replace(' ', '+');
  const avatar = `https://ui-avatars.com/api/?name=${first}&background=fbcfe8&color=9d174d&size=100&bold=true`;
  const contato = [irma.tel && `📞 ${irma.tel}`, irma.email && `✉️ ${irma.email}`].filter(Boolean).join('  ·  ') || 'Sem contato';

  return (
    <div style={{ background: '#fff', borderRadius: 16, padding: '16px 18px', border: '1px solid rgba(0,0,0,0.05)', boxShadow: '0 4px 14px rgba(0,0,0,0.04)', display: 'flex', gap: 14, alignItems: 'flex-start', borderLeft: `3px solid #ec4899` }}>
      <img src={avatar} alt="" style={{ width: 48, height: 48, borderRadius: '50%', border: `2px solid #ec4899`, flexShrink: 0 }} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 700, fontSize: 14 }}>{irma.nome}</div>
        <div style={{ fontSize: 12, color: '#6b7280', margin: '4px 0' }}>
          <span style={{ background: '#fce7f3', color: '#9d174d', borderRadius: 8, padding: '1px 8px', fontWeight: 700, fontSize: 11 }}>🌸 Irmã</span>
          &nbsp;·&nbsp; {irma.idade} anos &nbsp;·&nbsp; {irma.nasc}
        </div>
        <div style={{ fontSize: 12, color: '#374151' }}>{contato}</div>
      </div>
    </div>
  );
}

export default function SocorroClient({ irmasInicial }) {
  const [busca, setBusca] = useState('');

  const total = irmasInicial.length;
  const nContato = irmasInicial.filter(j => j.tel || j.email).length;

  let filtrados = irmasInicial;
  if (busca) filtrados = filtrados.filter(j => j.nome.toLowerCase().includes(busca.toLowerCase()));

  const kpis = [
    { label: 'Total de Irmãs', valor: total,    cor: '#ec4899', sub: 'na Sociedade de Socorro' },
    { label: 'Com Contato',    valor: nContato, cor: '#10B981', sub: 'tel ou e-mail registrado' },
  ];

  return (
    <DashLayout>
      <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', padding: '32px 40px', fontFamily: 'Arial, sans-serif' }}>

        {/* Header */}
        <div style={{ marginBottom: 28 }}>
          <h1 style={{ fontSize: 28, fontWeight: 900, color: '#0f172a', margin: 0 }}>🌸 Sociedade de Socorro — Diretório</h1>
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Ala Vila Jacuí (2119331) — Banco de Dados</p>
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
          <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="🔍 Buscar por nome..."
            style={{ padding: '10px 14px', borderRadius: 20, border: '1px solid #e2e8f0', fontSize: 13, flex: 1, minWidth: 200 }} />
        </div>

        {/* Grid de Irmãs */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: 12, marginBottom: 32 }}>
          {filtrados.map((j, i) => <IrmaCard key={i} irma={j} />)}
        </div>

        {filtrados.length === 0 && (
          <div style={{ textAlign: 'center', color: '#9ca3af', padding: 40 }}>Nenhuma irmã encontrada.</div>
        )}

        <div style={{ textAlign: 'center', color: '#9ca3af', fontSize: 12, marginTop: 24 }}>
          Banco de Dados — Ala Vila Jacuí
        </div>
      </div>
    </DashLayout>
  );
}
