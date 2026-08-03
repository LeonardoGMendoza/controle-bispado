'use client';
import DashLayout from '../../../components/DashLayout';
import { PieChart, Pie, Cell, Tooltip, Legend, BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer } from 'recharts';

export default function IndicadoresClient({ data }) {
  const { totalMembros, demografia, entrevistasStatus, notasResumo } = data;

  return (
    <DashLayout>
      <div style={{ backgroundColor: '#0b1120', minHeight: '100vh', padding: '32px 40px', fontFamily: 'Inter, Arial, sans-serif', color: '#f8fafc' }}>
        
        {/* Header no estilo do Alfabetização Nacional */}
        <div style={{ marginBottom: 36, display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ fontSize: 40 }}>📊</div>
          <div>
            <h1 style={{ fontSize: 32, fontWeight: 900, color: '#f8fafc', margin: 0, letterSpacing: '-0.5px' }}>Dashboard Bispado: Visão Analítica</h1>
            <p style={{ color: '#94a3b8', marginTop: 6, fontSize: 15 }}>Painel de Gestão e Indicadores Estratégicos da Ala Vila Jacuí</p>
          </div>
        </div>

        {/* Top KPIs Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 20, marginBottom: 40 }}>
          
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Total de Membros</div>
            <div style={{ fontSize: 42, fontWeight: 900, color: '#f8fafc', lineHeight: 1 }}>{totalMembros}</div>
            <div style={{ fontSize: 13, color: '#10b981', marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <span style={{ background: '#10b98122', padding: '2px 8px', borderRadius: 12, fontWeight: 700 }}>Operacional 🟢</span>
            </div>
          </div>

          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Entrevistas Agendadas</div>
            <div style={{ fontSize: 42, fontWeight: 900, color: '#3b82f6', lineHeight: 1 }}>{entrevistasStatus.find(e => e.name === 'Agendadas')?.value || 0}</div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>Aguardando realização</div>
          </div>

          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Notas Fiscais Pendentes</div>
            <div style={{ fontSize: 42, fontWeight: 900, color: '#ef4444', lineHeight: 1 }}>{notasResumo.pendentes}</div>
            <div style={{ fontSize: 13, color: '#ef4444', marginTop: 12 }}>Ação Necessária 🔴</div>
          </div>

          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: '24px', boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#94a3b8', textTransform: 'uppercase', letterSpacing: 1, marginBottom: 8 }}>Despesas do Mês</div>
            <div style={{ fontSize: 42, fontWeight: 900, color: '#f59e0b', lineHeight: 1 }}>
              {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL', maximumFractionDigits: 0 }).format(notasResumo.totalMes)}
            </div>
            <div style={{ fontSize: 13, color: '#94a3b8', marginTop: 12 }}>Gasto aprovado / pendente</div>
          </div>

        </div>

        {/* Gráficos Row */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginBottom: 40 }}>
          
          {/* Gráfico Demográfico */}
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: '24px', height: 400 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f8fafc', margin: '0 0 24px 0' }}>Distribuição Demográfica</h3>
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={demografia} cx="50%" cy="50%" innerRadius={80} outerRadius={120} paddingAngle={5} dataKey="value" stroke="none">
                  {demografia.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, color: '#f8fafc' }}
                  itemStyle={{ color: '#f8fafc', fontWeight: 600 }}
                />
                <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ color: '#cbd5e1' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Gráfico Entrevistas */}
          <div style={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 12, padding: '24px', height: 400 }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, color: '#f8fafc', margin: '0 0 24px 0' }}>Status das Entrevistas</h3>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={entrevistasStatus} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
                <XAxis dataKey="name" stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <YAxis stroke="#94a3b8" tick={{ fill: '#94a3b8' }} axisLine={false} tickLine={false} />
                <Tooltip 
                  cursor={{ fill: '#334155', opacity: 0.4 }}
                  contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: 8, color: '#f8fafc' }}
                />
                <Bar dataKey="value" radius={[6, 6, 0, 0]}>
                  {entrevistasStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.fill} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>

        </div>

      </div>
    </DashLayout>
  );
}
