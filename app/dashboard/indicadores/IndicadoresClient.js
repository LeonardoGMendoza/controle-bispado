'use client';
import { useState } from 'react';
import DashLayout from '../../../components/DashLayout';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function IndicadoresClient({ membros, entrevistas, notas }) {
  // Estados para os filtros
  const [focoMissao, setFocoMissao] = useState('');
  const [statusEvolucao, setStatusEvolucao] = useState('');
  const [sacerdocio, setSacerdocio] = useState('');
  const [novoBatizado, setNovoBatizado] = useState(false);
  const [precisaChamado, setPrecisaChamado] = useState('');
  const [recomendacao, setRecomendacao] = useState('');
  const [aniversariantes, setAniversariantes] = useState(false);

  // Lógica de cruzamento de filtros (Cross-filtering)
  let filtrados = membros;
  
  if (focoMissao) filtrados = filtrados.filter(m => m.focoMissao === focoMissao);
  if (statusEvolucao) filtrados = filtrados.filter(m => m.statusEvolucao === statusEvolucao);
  if (sacerdocio) filtrados = filtrados.filter(m => m.sacerdocio === sacerdocio);
  if (novoBatizado) filtrados = filtrados.filter(m => m.novoBatizado === true);
  if (precisaChamado) filtrados = filtrados.filter(m => m.precisaChamado === precisaChamado);
  if (recomendacao) filtrados = filtrados.filter(m => m.recomendacao === recomendacao);
  if (aniversariantes) filtrados = filtrados.filter(m => m.aniversariante === true);

  // Recálculo Dinâmico dos KPIs com base no DF Filtrado
  const totalFiltrados = filtrados.length;
  const jovens = filtrados.filter(m => m.idade < 18).length;
  const elderes = filtrados.filter(m => m.idade >= 18 && m.sexo === 'M').length;
  const socorro = filtrados.filter(m => m.idade >= 18 && m.sexo === 'F').length;

  const dataDemografia = [
    { name: 'Jovens (<18)', value: jovens, fill: '#3B82F6' },
    { name: 'Élderes/Sacerdócio', value: elderes, fill: '#F59E0B' },
    { name: 'Soc. Socorro', value: socorro, fill: '#D94F8A' }
  ].filter(d => d.value > 0);

  const entrevistasStatus = [
    { name: 'Realizadas', value: entrevistas.filter(e => e.status === 'Realizada').length, fill: '#10B981' },
    { name: 'Agendadas', value: entrevistas.filter(e => e.status === 'Agendada').length, fill: '#3B82F6' },
    { name: 'Faltou', value: entrevistas.filter(e => e.status === 'Faltou').length, fill: '#EF4444' }
  ];

  return (
    <DashLayout>
      <div style={{ display: 'flex', flexWrap: 'wrap', minHeight: '100vh', backgroundColor: '#0b1120', color: '#f8fafc', fontFamily: 'Inter, Arial, sans-serif' }}>
        
        {/* Painel de Filtros (Sidebar) */}
        <div style={{ flex: '1 1 280px', maxWidth: '100%', backgroundColor: '#0f172a', padding: 24, borderRight: '1px solid #1e293b' }}>
          <h2 style={{ fontSize: 18, fontWeight: 700, marginBottom: 8, display: 'flex', alignItems: 'center', gap: 8 }}>
            🛸 Filtros Estratégicos
          </h2>
          <p style={{ fontSize: 13, color: '#94a3b8', marginBottom: 24 }}>Aplique filtros para explorar o cenário analítico da Ala.</p>

          {/* Filtro: Foco Missão */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#cbd5e1', marginBottom: 6 }}>Foco Missão (Moças/Rapazes)</label>
            <select value={focoMissao} onChange={e => setFocoMissao(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc', fontSize: 13 }}>
              <option value="">Todos</option>
              <option value="Preparação Missão">Em Preparação (17-25)</option>
              <option value="Não se aplica">Não se aplica</option>
            </select>
          </div>

          {/* Filtro: Evolução */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#cbd5e1', marginBottom: 6 }}>Status de Evolução</label>
            <select value={statusEvolucao} onChange={e => setStatusEvolucao(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc', fontSize: 13 }}>
              <option value="">Todos</option>
              <option value="Evoluindo">Evoluindo 🟢</option>
              <option value="Precisa de Ajuda">Precisa de Ajuda 🔴</option>
            </select>
          </div>

          {/* Filtro: Sacerdócio */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#cbd5e1', marginBottom: 6 }}>Sacerdócio (Homens)</label>
            <select value={sacerdocio} onChange={e => setSacerdocio(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc', fontSize: 13 }}>
              <option value="">Todos</option>
              <option value="Sacerdote">Possui Sacerdócio</option>
              <option value="Sem Sacerdócio">Sem Sacerdócio</option>
            </select>
          </div>

          {/* Filtro: Recomendação */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#cbd5e1', marginBottom: 6 }}>Recomendação pro Templo</label>
            <select value={recomendacao} onChange={e => setRecomendacao(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc', fontSize: 13 }}>
              <option value="">Todos</option>
              <option value="Ativa">Ativa</option>
              <option value="Expirada/Sem">Expirada / Sem</option>
            </select>
          </div>

          {/* Filtro: Precisa de Chamado */}
          <div style={{ marginBottom: 16 }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 600, color: '#cbd5e1', marginBottom: 6 }}>Precisa de Chamado?</label>
            <select value={precisaChamado} onChange={e => setPrecisaChamado(e.target.value)} style={{ width: '100%', padding: '8px 12px', borderRadius: 6, backgroundColor: '#1e293b', border: '1px solid #334155', color: '#f8fafc', fontSize: 13 }}>
              <option value="">Todos</option>
              <option value="Sim">Sim</option>
              <option value="Não">Não</option>
            </select>
          </div>

          {/* Toggles Rápidos */}
          <div style={{ marginBottom: 12, display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" checked={novoBatizado} onChange={e => setNovoBatizado(e.target.checked)} id="novoBatizado" style={{ accentColor: '#3b82f6', width: 16, height: 16 }} />
            <label htmlFor="novoBatizado" style={{ fontSize: 13, color: '#cbd5e1', cursor: 'pointer' }}>Somente Novos Batizados</label>
          </div>

          <div style={{ marginBottom: 24, display: 'flex', alignItems: 'center', gap: 10 }}>
            <input type="checkbox" checked={aniversariantes} onChange={e => setAniversariantes(e.target.checked)} id="aniversariantes" style={{ accentColor: '#3b82f6', width: 16, height: 16 }} />
            <label htmlFor="aniversariantes" style={{ fontSize: 13, color: '#cbd5e1', cursor: 'pointer' }}>Aniversariantes do Mês 🎂</label>
          </div>

          <button onClick={() => {
            setFocoMissao(''); setStatusEvolucao(''); setSacerdocio(''); setNovoBatizado(false); setPrecisaChamado(''); setRecomendacao(''); setAniversariantes(false);
          }} style={{ width: '100%', padding: '10px', backgroundColor: '#334155', color: 'white', border: 'none', borderRadius: 6, cursor: 'pointer', fontSize: 13, fontWeight: 600 }}>
            Limpar Filtros
          </button>
        </div>

        {/* Área Principal dos Gráficos */}
        <div style={{ flex: '999 1 320px', padding: '24px 16px', overflowY: 'auto' }}>
          
          <div style={{ marginBottom: 36 }}>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#f8fafc', margin: 0 }}>Dashboard Analítico: Acompanhamento Pastoral</h1>
            <p style={{ color: '#94a3b8', marginTop: 6, fontSize: 15 }}>Monitoramento de KPIs da Ala — {totalFiltrados} membro(s) encontrado(s) no filtro atual</p>
          </div>

          {/* KPIs */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 20, marginBottom: 40 }}>
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(148, 163, 184, 0.35)', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Total Encontrado</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#f8fafc', lineHeight: 1.2 }}>{totalFiltrados}</div>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(148, 163, 184, 0.35)', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Jovens (Filtro)</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#3b82f6', lineHeight: 1.2 }}>{jovens}</div>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(148, 163, 184, 0.35)', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Recomendação Ativa (Geral)</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#10b981', lineHeight: 1.2 }}>{membros.filter(m => m.recomendacao === 'Ativa').length}</div>
            </div>
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(148, 163, 184, 0.35)', borderRadius: 10, padding: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase' }}>Missão em Foco (Geral)</div>
              <div style={{ fontSize: 36, fontWeight: 900, color: '#f59e0b', lineHeight: 1.2 }}>{membros.filter(m => m.focoMissao === 'Preparação Missão').length}</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 24 }}>
            {/* Gráfico Demográfico Dinâmico */}
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(148, 163, 184, 0.35)', borderRadius: 10, padding: 24, height: 400 }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc', margin: '0 0 16px 0' }}>Distribuição Demográfica (Dados Filtrados)</h3>
              {dataDemografia.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={dataDemografia} cx="50%" cy="50%" innerRadius={70} outerRadius={110} paddingAngle={5} dataKey="value" stroke="none">
                      {dataDemografia.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.fill} />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f8fafc' }} />
                    <Legend verticalAlign="bottom" height={36} wrapperStyle={{ color: '#cbd5e1' }} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b' }}>Nenhum dado para este filtro</div>
              )}
            </div>

            {/* Lista Rápida dos Resultados (Para ação do Bispo) */}
            <div style={{ background: 'rgba(15, 23, 42, 0.85)', border: '1px solid rgba(148, 163, 184, 0.35)', borderRadius: 10, padding: 24, height: 400, overflowY: 'auto' }}>
              <h3 style={{ fontSize: 16, fontWeight: 700, color: '#f8fafc', margin: '0 0 16px 0' }}>Membros Encontrados ({filtrados.length})</h3>
              {filtrados.length > 0 ? (
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {filtrados.slice(0, 100).map(m => (
                    <div key={m.id} style={{ padding: 12, background: '#1e293b', borderRadius: 6, borderLeft: `3px solid ${m.statusEvolucao === 'Precisa de Ajuda' ? '#ef4444' : '#10b981'}` }}>
                      <div style={{ fontWeight: 600, fontSize: 14 }}>{m.nome}</div>
                      <div style={{ fontSize: 12, color: '#94a3b8', marginTop: 4 }}>
                        {m.idade} anos • {m.sacerdocio} • Rec: {m.recomendacao}
                      </div>
                    </div>
                  ))}
                  {filtrados.length > 100 && <div style={{ textAlign: 'center', color: '#94a3b8', fontSize: 12 }}>+ {filtrados.length - 100} ocultos</div>}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', color: '#64748b' }}>Nenhum membro encontrado</div>
              )}
            </div>
          </div>

        </div>
      </div>
    </DashLayout>
  );
}
