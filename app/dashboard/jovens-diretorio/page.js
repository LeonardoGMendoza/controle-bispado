'use client';
import { useState } from 'react';
import DashLayout from '../../../components/DashLayout';

const JOVENS = [
  { nome: "Araújo, Giovanna Alves de",             sexo: "F", idade: 15, nasc: "3 abr 2011",   tel: "",              email: "",                          batizado: true  },
  { nome: "Barros, Elias Cardoso Santos",           sexo: "M", idade: 16, nasc: "24 abr 2010",  tel: "",              email: "",                          batizado: true  },
  { nome: "Cardoso, Abner Batista",                 sexo: "M", idade: 15, nasc: "28 jul 2011",  tel: "",              email: "",                          batizado: true  },
  { nome: "Cardoso, Pedro Batista",                 sexo: "M", idade: 13, nasc: "24 ago 2013",  tel: "",              email: "",                          batizado: false },
  { nome: "Colón Machado, Adriana",                 sexo: "F", idade: 19, nasc: "2 mai 2007",   tel: "",              email: "",                          batizado: true  },
  { nome: "Correa Machado, Katiuska",               sexo: "F", idade: 20, nasc: "19 jan 2006",  tel: "",              email: "",                          batizado: true  },
  { nome: "Correa Machado, Yosmary",                sexo: "F", idade: 17, nasc: "14 mai 2009",  tel: "",              email: "",                          batizado: true  },
  { nome: "Da Silva Dos Santos, Kaique",            sexo: "M", idade: 14, nasc: "12 jan 2012",  tel: "",              email: "",                          batizado: true  },
  { nome: "Da Silva Lima, Sthefany",                sexo: "F", idade: 18, nasc: "6 mai 2008",   tel: "",              email: "",                          batizado: true  },
  { nome: "Da Silva Santos, Lucas",                 sexo: "M", idade: 17, nasc: "11 out 2009",  tel: "",              email: "",                          batizado: true  },
  { nome: "De Araujo Gama, Ana Clara Dos Anjos",   sexo: "F", idade: 19, nasc: "7 dez 2006",   tel: "11975020958",   email: "anaclaraanjosgama@gmail.com", batizado: true  },
  { nome: "De Sousa Dos Santos, Leonardo",          sexo: "M", idade: 15, nasc: "4 mai 2011",   tel: "",              email: "",                          batizado: true  },
  { nome: "Dos Santos, Heitor Nunes",               sexo: "M", idade: 16, nasc: "30 out 2009",  tel: "",              email: "",                          batizado: true  },
  { nome: "Dos Santos, Samantha Ferreira",          sexo: "F", idade: 21, nasc: "9 mai 2005",   tel: "",              email: "",                          batizado: true  },
  { nome: "Ferreira Dos Santos, Izadora",           sexo: "F", idade: 16, nasc: "14 out 2009",  tel: "",              email: "",                          batizado: true  },
  { nome: "Gonçalves Lima, Isabela",                sexo: "F", idade: 13, nasc: "18 ago 2012",  tel: "",              email: "",                          batizado: false },
  { nome: "Janesky Calderón Machado, Dylan",        sexo: "M", idade: 20, nasc: "20 jun 2006",  tel: "11968786618",   email: "dylanjanesky18@gmail.com",  batizado: true  },
  { nome: "Ledezma, Leslie Valentina Bracho",       sexo: "F", idade: 17, nasc: "3 jan 2009",   tel: "11979867879",   email: "leslieledezma1@gmail.com",  batizado: true  },
  { nome: "Magnavita, Leticia Lopes De Souza",      sexo: "F", idade: 18, nasc: "9 jan 2008",   tel: "",              email: "",                          batizado: true  },
  { nome: "Neres Francelino, Alana",                sexo: "F", idade: 14, nasc: "23 dez 2011",  tel: "",              email: "",                          batizado: true  },
  { nome: "Neres Francelino, Ariel",                sexo: "M", idade: 18, nasc: "3 ago 2008",   tel: "",              email: "",                          batizado: true  },
  { nome: "Oliveira, Bianca Ferreira de",           sexo: "F", idade: 19, nasc: "12 mar 2007",  tel: "",              email: "",                          batizado: true  },
  { nome: "Oliveira, Davi Rodrigues de",            sexo: "M", idade: 20, nasc: "17 jan 2006",  tel: "",              email: "",                          batizado: true  },
  { nome: "Santos, Lary Cardoso Da Silva",          sexo: "F", idade: 14, nasc: "22 out 2011",  tel: "",              email: "",                          batizado: true  },
  { nome: "Silva, Eduardo Rony Farias",             sexo: "M", idade: 20, nasc: "16 jan 2006",  tel: "",              email: "",                          batizado: true  },
  { nome: "Silva, Julia Hagata Lopes da",           sexo: "F", idade: 17, nasc: "27 mar 2009",  tel: "",              email: "",                          batizado: true  },
  { nome: "Sousa, Leticia Cleto de",                sexo: "F", idade: 18, nasc: "18 jun 2008",  tel: "",              email: "ls8471650@gmail.com",        batizado: true  },
];

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

export default function JovensDiretorio() {
  const [mostrar, setMostrar] = useState('Todos');
  const [busca, setBusca]     = useState('');

  const total     = JOVENS.length;
  const nRap      = JOVENS.filter(j => j.sexo === 'M').length;
  const nMoc      = JOVENS.filter(j => j.sexo === 'F').length;
  const nNB       = JOVENS.filter(j => !j.batizado).length;
  const nContato  = JOVENS.filter(j => j.tel || j.email).length;

  let vis = JOVENS;
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
          <p style={{ color: '#64748b', marginTop: 4, fontSize: 14 }}>Ala Vila Jacuí (2119331) — Fonte: LCR</p>
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
          Fonte: LCR — lcr.churchofjesuschrist.org | Ala Vila Jacuí (2119331) | Agosto 2026
        </div>
      </div>
    </DashLayout>
  );
}
