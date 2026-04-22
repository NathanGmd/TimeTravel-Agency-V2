import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

export default function Footer() {
  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <footer className={styles.footer}>
      <span className={styles.logo}>⟨ TimeTravel Agency ⟩</span>
      <p className={styles.tagline}>Traversez les siècles. Vivez l'éternité.</p>
      <ul className={styles.links}>
        <li><button onClick={() => scrollTo('about')}>L'Agence</button></li>
        <li><Link to="/destinations">Destinations</Link></li>
        <li><button onClick={() => scrollTo('chat')}>Conseiller IA</button></li>
        <li><button onClick={() => scrollTo('booking')}>Réservation</button></li>
      </ul>
      <p className={styles.copy}>
        © 2087 TimeTravel Agency — Technologie Chronos-Drive™ · Tous droits réservés dans toutes les lignes temporelles
      </p>
    </footer>
  );
}
