import { useState, useEffect } from 'react';
import { NavLink, Link } from 'react-router-dom';
import styles from './Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <Link to="/" className={styles.logo}>⟨ TimeTravel ⟩</Link>
      <ul className={styles.links}>
        <li><button onClick={() => scrollTo('about')} className={styles.link}>L'Agence</button></li>
        <li><NavLink to="/destinations" className={styles.link}>Destinations</NavLink></li>
        <li><button onClick={() => scrollTo('chat')} className={styles.link}>Conseiller IA</button></li>
        <li><button onClick={() => scrollTo('booking')} className={styles.link}>Réserver</button></li>
      </ul>
    </nav>
  );
}
