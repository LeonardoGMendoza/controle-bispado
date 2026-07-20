'use client';
import DashLayout from '../../components/DashLayout';
import { useSession } from 'next-auth/react';
import styles from './dashboard.module.css';

export default function DashboardOverview() {
  const { data: session } = useSession();

  return (
    <DashLayout>
      <div className={styles.container}>

        {/* Boas-vindas */}
        <div className={styles.welcomeRow}>
          <div>
            <h1 className={styles.pageTitle}>Visão Geral</h1>
            <p className={styles.pageSub}>Acompanhe os principais indicadores do Controle do Bispado.</p>
          </div>
        </div>

        <div style={{ padding: '40px', backgroundColor: 'white', borderRadius: '12px', marginTop: '20px', boxShadow: '0 4px 12px rgba(0,0,0,0.05)' }}>
          <h2 style={{ color: '#005c8a', marginBottom: '16px' }}>Bem-vindo, {(session && session.user && session.user.name) || 'Líder'}</h2>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Este é o painel de gestão oficial do Bispado. Aqui você pode acompanhar as Notas Fiscais, gerenciar o acompanhamento dos Rapazes e Moças, organizar Entrevistas e Visitas, e cuidar dos fundos de Missão e Compras.
          </p>
          <br/>
          <p style={{ color: '#666', lineHeight: '1.6' }}>
            Selecione uma opção no menu lateral para começar.
          </p>
        </div>

      </div>
    </DashLayout>
  );
}
