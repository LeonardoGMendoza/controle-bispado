export default function MissaoPage() {
  const missionarios = [
    {
      nome: 'Dylan Janesky Calderón Machado',
      status: 'Servindo',
      missao: 'Brazil Fortaleza Mission',
      datas: '27 mai. 2026 - 17 mai. 2028',
      cor: '#22c55e', // Verde para Servindo
      foto: '/dylan.jpeg'
    },
    {
      nome: 'Ana Clara dos Anjos Gama',
      status: 'Chamado Recebido',
      missao: 'Missão Argentina',
      datas: 'Aguardando partida',
      cor: '#3b82f6', // Azul para Chamado Recebido
      foto: '/ana.jpg'
    },
    {
      nome: 'Leslie Valentina Bracho Ledezma',
      status: 'Chamado Recebido',
      missao: 'Missão Brasil Bahia',
      datas: 'Aguardando partida',
      cor: '#3b82f6',
      foto: '/leslie.jfif'
    }
  ];

  return (
    <div style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Cabeçalho */}
      <div style={{ padding: '20px 40px', backgroundColor: '#fff', borderBottom: '1px solid #e2e8f0', marginBottom: '40px' }}>
        <h1 style={{ fontSize: '32px', fontWeight: 'bold', color: '#0f172a' }}>
          🌍 Quadro de Jovens para a Missão
        </h1>
        <p style={{ color: '#64748b', fontSize: '16px', marginTop: '5px' }}>
          Acompanhe os jovens que estão se preparando ou já servindo.
        </p>
      </div>

      {/* Grade de Cartões */}
      <div style={{ padding: '0 40px', display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
        
        {missionarios.map((m, index) => (
          <div key={index} style={{
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            border: '1px solid #e2e8f0',
            boxShadow: '0 4px 6px rgba(0,0,0,0.05)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ backgroundColor: m.cor, padding: '12px', color: '#fff', textAlign: 'center', fontWeight: 'bold', fontSize: '14px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {m.status}
            </div>
            
            <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
              
              <div style={{ 
                width: '100px', height: '100px', borderRadius: '50%', backgroundColor: '#f1f5f9', 
                marginBottom: '16px', overflow: 'hidden', border: `3px solid ${m.cor}`,
                display: 'flex', justifyContent: 'center', alignItems: 'center'
              }}>
                <img 
                  src={m.foto} 
                  alt={m.nome} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
              </div>
              
              <h2 style={{ fontSize: '20px', fontWeight: 'bold', color: '#1e293b', textAlign: 'center', marginBottom: '16px', lineHeight: '1.2' }}>
                {m.nome}
              </h2>
              
              <div style={{ width: '100%', backgroundColor: '#f8fafc', border: '1px solid #e2e8f0', padding: '12px', borderRadius: '8px', textAlign: 'center', marginBottom: '16px' }}>
                <span style={{ display: 'block', fontSize: '12px', color: '#64748b', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '4px' }}>Missão</span>
                <span style={{ display: 'block', fontSize: '16px', color: '#0f172a', fontWeight: 'bold' }}>{m.missao}</span>
              </div>
              
              <div style={{ fontSize: '14px', color: '#64748b', marginTop: 'auto', fontWeight: 'bold' }}>
                📅 {m.datas}
              </div>
              
            </div>
          </div>
        ))}
        
      </div>
    </div>
  );
}