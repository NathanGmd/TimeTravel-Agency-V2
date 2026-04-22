import { useEffect, useRef } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let stars = [];
    let raf;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: 220 }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        r: Math.random() * 1.4,
        alpha: Math.random(),
        speed: Math.random() * 0.25 + 0.04,
        twinkle: Math.random() * Math.PI * 2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      stars.forEach(s => {
        s.twinkle += 0.018;
        const a = s.alpha * (0.4 + 0.6 * Math.sin(s.twinkle));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(232,201,122,${a})`;
        ctx.fill();
        s.y -= s.speed;
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
      });
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', resize); };
  }, []);

  const scrollTo = (id) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });

  return (
    <section className={styles.hero} id="hero">
      <canvas ref={canvasRef} className={styles.canvas} />

      {/* Portal rings */}
      <div className={styles.portalWrap}>
        <div className={styles.glow} />
        {[1, 2, 3, 4].map(i => <div key={i} className={`${styles.ring} ${styles[`ring${i}`]}`} />)}
      </div>

      <div className={styles.content}>
        <p className={styles.eyebrow}>✦ Agence de Voyages Temporels ✦</p>
        <h1 className={styles.title}>
          TimeTravel<br />Agency
        </h1>
        <p className={styles.subtitle}>Traversez les siècles. Vivez l'éternité.</p>
        <button className={styles.cta} onClick={() => scrollTo('destinations')}>
          <span>⟶</span> Découvrir les destinations
        </button>
      </div>

      <div className={styles.scrollHint}>
        <span>Défiler</span>
        <div className={styles.scrollLine} />
      </div>
    </section>
  );
}
