"use client";
import React from 'react';

export default function PosterMissao() {
  const rapazes = [
    "Roberto Junior Teixeira de Jesus",
    "Jonathan Mosíah Rincón Maurera",
    "Rodrigo Augusto Arcanjo Teles",
    "Gustavo Silva Lopes Magnavita",
    "Jeremias Joel Bracho Ledezma",
    "Augusto Henrique Arcanjo Teles",
    "William Silva Freitas",
    "Henrique Alves Sabino",
    "Paulo Henrique Dos Santos"
  ];

  const mocas = [
    "Maria Laura Batista Cardoso",
    "Ana Clara dos Anjos Gama",
    "Leslie Valentina Bracho Ledezma",
    "Leticia Cleto de Sousa",
    "Jennifer Lucia Atahuachi Ortiz",
    "Kemilly costa maia Averedo",
    "Emanuela Núria Moreira de Lima",
    "Claryssa Geovana Rodrigues",
    "Valéria Pachuri Velez",
    "Heloísa Santiago Morais",
    "Nicolly Gomes Alves Pereira",
    "Julia Hagata Lopes da Silva"
  ];

  return (
    <div className="container">
      <style dangerouslySetInnerHTML={{__html: `
        @import url('https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap');
        
        @media print {
          @page {
            margin: 0; /* Remove margens padrão e cabeçalho/rodapé do navegador */
            size: A4 landscape; /* Força modo paisagem se necessário, mas o usuário escolheu paisagem no print, então A4 funciona */
          }
          body {
            -webkit-print-color-adjust: exact;
            print-color-adjust: exact;
            background-color: #050510 !important;
            margin: 0;
            padding: 10px !important;
          }
          .no-print { display: none !important; }
          
          /* Encolhendo tamanhos para caber em 1 página */
          .neon-title {
            font-size: 2.5rem !important;
            margin-bottom: 10px !important;
            padding: 10px 20px !important;
          }
          .neon-box, .neon-box-pink {
            padding: 10px !important;
            margin: 5px !important;
          }
          .neon-subtitle, .neon-subtitle-pink {
            font-size: 1.5rem !important;
            margin-bottom: 10px !important;
          }
          .name-item {
            font-size: 0.95rem !important;
            padding: 3px 0 !important;
          }
          .container {
            padding: 10px !important;
            min-height: auto !important;
          }
        }

        .container {
          background-color: #050510;
          min-height: 100vh;
          color: #fff;
          font-family: system-ui, -apple-system, sans-serif;
          padding: 20px;
          display: flex;
          flex-direction: column;
          align-items: center;
          background-image: radial-gradient(circle at center, #1a0b2e 0%, #050510 100%);
        }

        .neon-title {
          font-family: 'Oswald', sans-serif;
          font-size: 4rem;
          color: #fff;
          text-transform: uppercase;
          text-align: center;
          text-shadow: 
            0 0 7px #fff,
            0 0 10px #fff,
            0 0 21px #fff,
            0 0 42px #0fa,
            0 0 82px #0fa,
            0 0 92px #0fa,
            0 0 102px #0fa,
            0 0 151px #0fa;
          margin-bottom: 30px;
          border: 4px solid #fff;
          padding: 15px 30px;
          border-radius: 15px;
          box-shadow: 
            0 0 10px #fff,
            inset 0 0 10px #fff,
            0 0 20px #0fa,
            inset 0 0 20px #0fa;
        }

        .neon-box {
          background: rgba(15, 255, 170, 0.05);
          border: 2px solid #0fa;
          border-radius: 10px;
          padding: 15px;
          margin: 10px;
          flex: 1;
          box-shadow: 0 0 15px rgba(15, 255, 170, 0.3), inset 0 0 15px rgba(15, 255, 170, 0.2);
        }

        .neon-box-pink {
          background: rgba(255, 15, 170, 0.05);
          border: 2px solid #f0a;
          border-radius: 10px;
          padding: 15px;
          margin: 10px;
          flex: 1;
          box-shadow: 0 0 15px rgba(255, 15, 170, 0.3), inset 0 0 15px rgba(255, 15, 170, 0.2);
        }

        .neon-subtitle {
          font-size: 1.8rem;
          text-align: center;
          margin-top: 0;
          margin-bottom: 15px;
          font-weight: bold;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 0 10px #0fa, 0 0 20px #0fa;
        }

        .neon-subtitle-pink {
          font-size: 1.8rem;
          text-align: center;
          margin-top: 0;
          margin-bottom: 15px;
          font-weight: bold;
          text-transform: uppercase;
          color: #fff;
          text-shadow: 0 0 10px #f0a, 0 0 20px #f0a;
        }

        .name-item {
          font-size: 1.1rem;
          padding: 5px 0;
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
          font-weight: 500;
          letter-spacing: 1px;
        }
      `}} />
      <div className="no-print" style={{ marginBottom: '15px' }}>
        <button 
          onClick={() => window.print()}
          style={{
            padding: '10px 20px',
            fontSize: '18px',
            backgroundColor: '#0fa',
            color: '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: 'bold'
          }}
        >
          🖨️ IMPRIMIR QUADRO NEON
        </button>
      </div>

      <h1 className="neon-title">
        PREPARAÇÃO PARA A MISSÃO
      </h1>

      <div style={{ display: 'flex', width: '100%', maxWidth: '1200px', gap: '20px' }}>
        
        <div className="neon-box">
          <h2 className="neon-subtitle">👔 Rapazes</h2>
          {rapazes.map((nome, i) => (
            <div key={i} className="name-item">
              {nome}
            </div>
          ))}
        </div>

        <div className="neon-box-pink">
          <h2 className="neon-subtitle-pink">👗 Moças</h2>
          {mocas.map((nome, i) => (
            <div key={i} className="name-item">
              {nome}
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}
