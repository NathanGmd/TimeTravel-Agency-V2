import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { destinationsApi } from '../services/api.js';
import DestinationCard from '../components/sections/DestinationCard.jsx';
import Modal from '../components/ui/Modal.jsx';
import styles from './DestinationsPage.module.css';

export default function DestinationsPage() {
  const [destinations, setDestinations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selected, setSelected] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    destinationsApi.getAll()
      .then(r => setDestinations(r.data))
      .finally(() => setLoading(false));
  }, []);

  const handleReserve = (id) => {
    navigate(`/?dest=${id}#booking`);
  };

  return (
    <div className={styles.page}>
      <div className={styles.hero}>
        <span className="section-eyebrow">— Toutes les Destinations —</span>
        <h1 className="section-title">Choisissez votre Époque</h1>
        <p className="section-desc">De l'Antiquité au futur lointain, explorez toutes nos destinations temporelles.</p>
      </div>

      {loading ? (
        <div className={styles.loading}>Chargement des destinations…</div>
      ) : (
        <div className={styles.grid}>
          {destinations.map(dest => (
            <DestinationCard
              key={dest.id}
              destination={dest}
              onDetails={setSelected}
              onReserve={handleReserve}
            />
          ))}
        </div>
      )}

      <Modal isOpen={!!selected} onClose={() => setSelected(null)}>
        {selected && (
          <div style={{ padding: '0.5rem 0' }}>
            <h2 style={{ fontFamily: 'var(--font-display)', color: 'var(--gold)', marginBottom: '1rem' }}>
              {selected.title}
            </h2>
            <p style={{ color: 'var(--text-dim)', lineHeight: '1.8', marginBottom: '1.5rem' }}>{selected.longDesc}</p>
            <button
              onClick={() => { setSelected(null); handleReserve(selected.id); }}
              style={{
                padding: '0.9rem 2rem', border: '1px solid var(--gold)', background: 'transparent',
                color: 'var(--gold)', fontFamily: 'var(--font-mono)', fontSize: '0.65rem',
                letterSpacing: '0.2em', textTransform: 'uppercase', cursor: 'pointer',
              }}
            >
              ⟶ Réserver
            </button>
          </div>
        )}
      </Modal>
    </div>
  );
}
