'use client';
import { useState } from 'react';
import Link from 'next/link';
import styles from '../styles/Navbar.module.css';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.navTop}>
        <div className={styles.navContainer}>
          <Link href="/" className={styles.logoArea}>
            <div className={styles.logoSquare}>
              {/* Simulate the Christus logo with a simple icon or text */}
              <span style={{color: 'white', fontSize: '20px'}}>⛪</span>
            </div>
            <div className={styles.logoText}>
              <span className={styles.logoTitle}>A IGREJA DE</span>
              <span className={styles.logoTitle}>JESUS CRISTO</span>
              <span className={styles.logoSub}>DOS SANTOS</span>
              <span className={styles.logoSub}>DOS ÚLTIMOS DIAS</span>
            </div>
          </Link>

          <ul className={styles.menu}>
            <li><Link href="#">Minha Página</Link></li>
            <li><Link href="#">Bibliotecas</Link></li>
            <li><Link href="#">Servir</Link></li>
            <li><Link href="#">Notícias</Link></li>
            <li><Link href="#">Sobre nós</Link></li>
            <li><Link href="/dashboard" className={styles.controleLink}>controle bispo</Link></li>
          </ul>

          <div className={styles.rightMenu}>
            <span className={styles.icon}>🔍</span>
            <span className={styles.icon}>🌐</span>
            <span className={styles.icon}>⋮⋮</span>
            <Link href="/dashboard/login" className={styles.btnEntrar}>
              👤 Entrar
            </Link>
          </div>

          <button className={styles.mobileBtn} onClick={() => setIsOpen(!isOpen)} aria-label="Menu">
            {isOpen ? '✖' : '☰'}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className={styles.mobileDropdown}>
          <ul>
            <li><Link href="#" onClick={() => setIsOpen(false)}>Minha Página</Link></li>
            <li><Link href="#" onClick={() => setIsOpen(false)}>Bibliotecas</Link></li>
            <li><Link href="#" onClick={() => setIsOpen(false)}>Servir</Link></li>
            <li><Link href="#" onClick={() => setIsOpen(false)}>Notícias</Link></li>
            <li><Link href="#" onClick={() => setIsOpen(false)}>Sobre nós</Link></li>
            <li><Link href="/dashboard" onClick={() => setIsOpen(false)} style={{fontWeight: 'bold', color: '#005c8a'}}>controle bispo</Link></li>
          </ul>
        </div>
      )}
    </header>
  );
}
