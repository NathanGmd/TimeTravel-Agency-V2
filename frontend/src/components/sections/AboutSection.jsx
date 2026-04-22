import { useEffect, useRef } from 'react';
import styles from './AboutSection.module.css';

const STATS = [
  { num: '2,847', label: 'Voyageurs satisfaits' },
  { num: '∞',     label: 'Époques disponibles' },
  { num: '0',     label: 'Paradoxes créés' },
  { num: '15+',   label: "Années d'expertise" },
];

export default function AboutSection() {
  const clockRef = useRef(null);

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const h = now.getHours() % 12;
      const m = now.getMinutes();
      const s = now.getSeconds();
      const hDeg = (h / 12) * 360 + (m / 60) * 30;
      const mDeg = (m / 60) * 360 + (s / 60) * 6;
      const sDeg = (s / 60) * 360;
      const el = clockRef.current;
      if (!el) return;
      el.querySelector('[data-hour]').style.transform   = `rotate(${hDeg}deg)`;
      el.querySelector('[data-minute]').style.transform = `rotate(${mDeg}deg)`;
      el.querySelector('[data-second]').style.transform = `rotate(${sDeg}deg)`;
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className={styles.section} id="about">
      <div className={styles.grid}>
        <div className={styles.text}>
          <h2 className={styles.heading}>L'art du voyage<br />à travers les âges</h2>
          <p>
            Fondée en <strong>2087</strong>, TimeTravel Agency est la première agence à proposer des
            voyages temporels certifiés. Grâce à la technologie <strong>Chronos-Drive™</strong>, nous
            vous transportons vers les époques les plus fascinantes de l'histoire humaine.
          </p>
          <p>
            Chaque voyage est soigneusement encadré par nos <strong>Guides Temporels Certifiés</strong>,
            garantissant une expérience inoubliable dans le strict respect du paradoxe de causalité.
          </p>
          <div className={styles.stats}>
            {STATS.map(s => (
              <div key={s.label} className={styles.stat}>
                <span className={styles.statNum}>{s.num}</span>
                <span className={styles.statLabel}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.visual}>
          <div className={styles.clockWrap} ref={clockRef}>
            <div className={styles.clock}>
              {/* Ticks */}
              {Array.from({ length: 12 }, (_, i) => (
                <div key={i} className={styles.tick} style={{ transform: `rotate(${i * 30}deg)` }}>
                  <div className={`${styles.tickLine} ${i % 3 === 0 ? styles.tickMajor : ''}`} />
                </div>
              ))}
              <div className={styles.hand} data-hour   style={{ height: 68 }} />
              <div className={styles.hand} data-minute style={{ height: 92, width: 2, background: 'var(--gold-light)' }} />
              <div className={styles.hand} data-second style={{ height: 100, width: 1, background: 'var(--ancient)' }} />
              <div className={styles.center} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
