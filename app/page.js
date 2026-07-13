import Navbar from '../components/Navbar';
import Link from 'next/link';
import styles from './page.module.css';

export default function Home() {
  return (
    <main style={{ backgroundColor: '#f5f5f5', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ position: 'relative', width: '100%', height: '400px', backgroundColor: '#e0e0e0', overflow: 'hidden' }}>
        <img 
          src="/elderly_care.png" 
          alt="Templos" 
          style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.8 }} 
        />
        <div style={{ position: 'absolute', bottom: '20px', left: '20px', color: 'white', textShadow: '1px 1px 4px rgba(0,0,0,0.8)' }}>
          <h1 style={{ fontSize: '32px', fontWeight: 'bold' }}>Templos</h1>
        </div>
      </section>

      {/* Grid Section */}
      <section style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px' }}>
          
          <div style={{ position: 'relative', height: '250px', backgroundColor: '#ddd', borderRadius: '4px', overflow: 'hidden' }}>
            <img src="/nursing_team.png" alt="Preparai-vos" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
            <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '10px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white', fontWeight: 'bold' }}>
              Preparai-vos para a casa do Senhor
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'relative', height: '115px', backgroundColor: '#ccc', borderRadius: '4px', overflow: 'hidden' }}>
              <img src="/elderly_care.png" alt="Bem-vindo" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '10px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white', fontWeight: 'bold' }}>
                Seja bem-vindo ao Templo
              </div>
            </div>
            
            <div style={{ position: 'relative', height: '115px', backgroundColor: '#ccc', borderRadius: '4px', overflow: 'hidden' }}>
              <img src="/nursing_team_cima.png" alt="Interior" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', bottom: 0, width: '100%', padding: '10px', background: 'linear-gradient(transparent, rgba(0,0,0,0.8))', color: 'white', fontWeight: 'bold' }}>
                Interior dos templos
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Ícones de atalho */}
      <section style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ textAlign: 'center', color: '#005c8a', cursor: 'pointer' }}>
            <div style={{ fontSize: '40px' }}>📅</div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>Agendar</div>
          </div>
          <div style={{ textAlign: 'center', color: '#005c8a', cursor: 'pointer' }}>
            <div style={{ fontSize: '40px' }}>⛪</div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>Encontre</div>
          </div>
          <div style={{ textAlign: 'center', color: '#005c8a', cursor: 'pointer' }}>
            <div style={{ fontSize: '40px' }}>🗺️</div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>Mapa</div>
          </div>
          <div style={{ textAlign: 'center', color: '#005c8a', cursor: 'pointer' }}>
            <div style={{ fontSize: '40px' }}>🖼️</div>
            <div style={{ fontSize: '14px', marginTop: '8px' }}>Galeria</div>
          </div>
        </div>
      </section>
      
    </main>
  );
}
