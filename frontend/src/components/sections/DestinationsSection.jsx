import { useEffect, useState } from 'react';
import { destinationsApi } from '../../services/api.js';
import DestinationCard from './DestinationCard.jsx';
import Modal from '../ui/Modal.jsx';
import styles from './DestinationsSection.module.css';

export default function DestinationsSection({ onReserve }) {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);

  useEffect(() => {
    destinationsApi.getAll()
      .then(res => setDestinations(res.data))
      .catch(() => setDestinations([]))
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
          <span className={styles.metaLabel}>note moyenne</span>
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
