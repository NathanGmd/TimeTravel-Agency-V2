import { useEffect, useState } from 'react';
import { destinationsApi } from '../../services/api.js';
import DestinationCard from './DestinationCard.jsx';
import Modal from '../ui/Modal.jsx';
import styles from './DestinationsSection.module.css';

// Données statiques de secours — affichées si le backend est inaccessible
const FALLBACK_DESTINATIONS = [
  {
    id: 'paris1889',
    era: 'Belle Époque',
    title: 'Paris 1889 — Belle Époque',
    period: 'Année 1889',
    shortDesc: "Vivez l'inauguration de la Tour Eiffel, l'Exposition Universelle et la splendeur de la Belle Époque parisienne.",
    longDesc: "Paris en 1889 est à son apogée. L'Exposition Universelle attire des millions de visiteurs du monde entier, et la toute nouvelle Tour Eiffel domine le ciel de la capitale.",
    price: 8900, currency: 'chronos-coins',
    duration: { min: 3, max: 14 }, difficulty: 'Débutant',
    tags: ['Belle Époque', 'Tour Eiffel', 'Art', 'Gastronomie'],
    highlights: ["Inauguration de la Tour Eiffel", "Exposition Universelle", "Soirée au Moulin Rouge", "Montmartre avec les impressionnistes"],
    included: ["Guide Temporel Certifié", "Tenue Belle Époque", "Traducteur XIXe siècle", "Assurance Paradoxe Causal"],
    warning: "Évitez d'évoquer les guerres mondiales.",
    color: '#c9a84c', rating: 4.9, bookings: 1243,
  },
  {
    id: 'cretace',
    era: 'Préhistoire',
    title: 'Crétacé — -65 millions d\'années',
    period: '-65 000 000 av. J.-C.',
    shortDesc: 'Observez les dinosaures dans leur habitat naturel depuis une capsule blindée sécurisée.',
    longDesc: "Le Crétacé supérieur est le royaume des titans. Tyrannosaures, Tricératops, Ptérosaures — la mégafaune règne sur une Terre méconnaissable.",
    price: 15500, currency: 'chronos-coins',
    duration: { min: 2, max: 7 }, difficulty: 'Débutant (capsule)',
    tags: ['Dinosaures', 'Nature', 'Aventure', 'Famille'],
    highlights: ["Safari T-Rex en capsule blindée", "Troupeau de Tricératops", "Vol au-dessus des forêts crétacées"],
    included: ["Guide & Paléontologue certifié", "Capsule blindée climatisée", "Combinaison atmosphérique", "Assurance Paradoxe Causal"],
    warning: "Sortie de la capsule formellement interdite.",
    color: '#4aaa3a', rating: 4.8, bookings: 892,
  },
  {
    id: 'florence1504',
    era: 'Renaissance',
    title: 'Florence 1504 — La Renaissance',
    period: 'Année 1504',
    shortDesc: 'Traversez Florence au sommet de la Renaissance : Michel-Ange, Léonard de Vinci, les Médicis.',
    longDesc: "Florence en 1504 est le centre du monde civilisé. Michel-Ange vient de terminer le David, Léonard de Vinci travaille sur la Bataille d'Anghiari.",
    price: 11200, currency: 'chronos-coins',
    duration: { min: 5, max: 21 }, difficulty: 'Intermédiaire',
    tags: ['Renaissance', 'Art', 'Michel-Ange', 'Architecture'],
    highlights: ["Inauguration du David de Michel-Ange", "Atelier de Léonard de Vinci", "Audience avec les Médicis"],
    included: ["Guide Temporel Certifié", "Tenue Renaissance", "Traducteur toscan XVIe", "Assurance Paradoxe Causal"],
    warning: "Vaccinations temporelles obligatoires contre la peste.",
    color: '#c44a1a', rating: 4.7, bookings: 654,
  },
];

export default function DestinationsSection({ onReserve }) {
  const [destinations, setDestinations] = useState(FALLBACK_DESTINATIONS);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    destinationsApi.getAll()
      .then(res => { if (res.data?.length) setDestinations(res.data); })
      .catch(() => { /* garde les données fallback */ })
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className={styles.section} id="destinations">
      <div className={styles.header}>
        <span className="section-eyebrow">— 02 — Destinations</span>
        <h2 className="section-title">Choisissez votre Époque</h2>
        <p className="section-desc">Trois ères extraordinaires, des expériences uniques, des souvenirs pour l'éternité.</p>
      </div>

      {loading ? (
        <div className={styles.loading}>
          <span className={styles.loadingDot} />
          <span className={styles.loadingDot} />
          <span className={styles.loadingDot} />
        </div>
      ) : (
        <div className={styles.grid}>
          {destinations.map(dest => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onDetails={setSelected}
              onReserve={onReserve}
            />
          ))}
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && <DestinationDetail dest={selected} onReserve={(id) => { setSelected(null); onReserve(id); }} />}
      </Modal>
    </section>
  );
}

function DestinationDetail({ dest, onReserve }) {
  return (
    <div className={styles.detail}>
      <span className={styles.detailEra} style={{ color: dest.color, borderColor: dest.color }}>{dest.era}</span>
      <h2 className={styles.detailTitle}>{dest.title}</h2>
      <p className={styles.detailPeriod}>{dest.period}</p>
      <p className={styles.detailDesc}>{dest.longDesc}</p>

      <div className={styles.detailCols}>
        <div>
          <p className={styles.colLabel}>Expériences incluses</p>
          {dest.highlights.map(h => (
            <p key={h} className={styles.highlight} style={{ borderColor: dest.color }}>· {h}</p>
          ))}
        </div>
        <div>
          <p className={styles.colLabel}>Dans le forfait</p>
          {dest.included.map(i => (
            <p key={i} className={styles.included}>✓ {i}</p>
          ))}
        </div>
      </div>

      <div className={styles.detailMeta}>
        <div className={styles.metaItem}>
          <span className={styles.metaNum}>{dest.price.toLocaleString('fr-FR')} ⊕</span>
          <span className={styles.metaLabel}>par personne</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaNum}>{dest.duration.min}–{dest.duration.max} j</span>
          <span className={styles.metaLabel}>durée</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaNum}>{dest.difficulty}</span>
          <span className={styles.metaLabel}>niveau</span>
        </div>
        <div className={styles.metaItem}>
          <span className={styles.metaNum}>★ {dest.rating}</span>
          <span className={styles.metaLabel}>note</span>
        </div>
      </div>

      <div className={styles.warning}>
        <span>⚠ Avertissement temporel</span>
        <p>{dest.warning}</p>
      </div>

      <button className={styles.detailReserve} onClick={() => onReserve(dest.id)}>
        ⟶ Réserver cette destination
      </button>
    </div>
  );
}
