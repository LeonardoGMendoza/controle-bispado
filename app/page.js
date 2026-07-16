import Link from 'next/link';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#f8fafc', minHeight: '100vh', fontFamily: 'Arial, sans-serif', position: 'relative' }}>
      
      {/* Botão Entrar Superior Direito */}
      <div style={{ position: 'absolute', top: '20px', right: '40px' }}>
        <Link href="/dashboard/login" style={{
          padding: '10px 24px',
          backgroundColor: '#ffffff',
          color: '#333',
          border: '2px solid #000',
          borderRadius: '4px',
          fontWeight: 'bold',
          textDecoration: 'none',
          boxShadow: '2px 2px 0px #000',
          transition: 'all 0.2s ease',
          display: 'inline-block'
        }}>
          Entrar
        </Link>
      </div>

      {/* Container Central */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', padding: '20px' }}>
        <div style={{
          width: '100%',
          maxWidth: '800px',
          backgroundColor: '#ffffff',
          border: '4px solid #000',
          borderRadius: '8px',
          padding: '40px',
          boxShadow: '8px 8px 0px rgba(0,0,0,0.1)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          
          <h1 style={{ 
            fontSize: '32px', 
            fontWeight: 'bold', 
            marginBottom: '40px',
            color: '#1a1a1a',
            textAlign: 'center'
          }}>
            Obispado Vila Jacui
          </h1>

          {/* Área da Imagem / Carrossel */}
          <div style={{
            width: '100%',
            maxWidth: '600px',
            border: '2px solid #000',
            borderRadius: '4px',
            overflow: 'hidden',
            backgroundColor: '#f1f1f1',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            minHeight: '350px'
          }}>
            {/* Aqui vai a foto oficial do Bispado puxando o arquivo capa.png */}
            <img 
              src="/capa.png" 
              alt="Obispado Vila Jacui" 
              style={{ width: '100%', height: 'auto', display: 'block', objectFit: 'cover' }}
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.nextSibling.style.display = 'flex';
              }}
            />
            <div style={{ display: 'none', flexDirection: 'column', alignItems: 'center', color: '#666' }}>
              <span style={{ fontSize: '40px', marginBottom: '10px' }}>📸</span>
              <span>Imagem da Equipe não encontrada (Verifique se salvou como capa.png na pasta public)</span>
            </div>
          </div>

        </div>
      </div>
      
    </main>
  );
}