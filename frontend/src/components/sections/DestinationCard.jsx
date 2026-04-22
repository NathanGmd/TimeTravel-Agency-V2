import { useEffect, useRef } from 'react';
import styles from './DestinationCard.module.css';

// ── Procedural canvas renderers ───────────────────────────────

function drawAncient(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#1a0a05'); sky.addColorStop(0.6, '#4a1a08'); sky.addColorStop(1, '#8a3510');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 40; i++) {
    ctx.beginPath(); ctx.arc(Math.random()*W, Math.random()*H*0.5, Math.random()*1.2, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(255,220,120,0.7)'; ctx.fill();
  }
  ctx.beginPath(); ctx.arc(W*0.78, H*0.2, 28, 0, Math.PI*2);
  ctx.fillStyle = 'rgba(255,220,150,0.9)'; ctx.fill();
  [[W*0.33, 200, 155],[W*0.62, 140, 108],[W*0.82, 95, 76]].forEach(([x, bw, h]) => {
    ctx.beginPath(); ctx.moveTo(x, H); ctx.lineTo(x-bw/2, H); ctx.lineTo(x, H-h); ctx.lineTo(x+bw/2, H); ctx.closePath();
    ctx.fillStyle = 'rgba(55,22,4,0.92)'; ctx.fill();
  });
  ctx.beginPath(); ctx.moveTo(0, H); ctx.quadraticCurveTo(W*0.3, H-28, W*0.6, H-14); ctx.quadraticCurveTo(W*0.8, H, W, H-18); ctx.lineTo(W,H); ctx.closePath();
  ctx.fillStyle = '#3a1505'; ctx.fill();
}

function drawMedieval(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  const sky = ctx.createLinearGradient(0, 0, 0, H);
  sky.addColorStop(0, '#020810'); sky.addColorStop(0.7, '#061520'); sky.addColorStop(1, '#0a2010');
  ctx.fillStyle = sky; ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < 55; i++) {
    ctx.beginPath(); ctx.arc(Math.random()*W, Math.random()*H*0.6, Math.random()*1, 0, Math.PI*2);
    ctx.fillStyle = 'rgba(200,230,255,0.6)'; ctx.fill();
  }
  ctx.beginPath(); ctx.arc(W*0.2, H*0.2, 24, 0, Math.PI*2); ctx.fillStyle='rgba(220,240,200,0.9)'; ctx.fill();
  ctx.beginPath(); ctx.arc(W*0.2+7, H*0.2-4, 21, 0, Math.PI*2); ctx.fillStyle='#061520'; ctx.fill();
  const tree = (x, h) => {
    ctx.beginPath(); ctx.moveTo(x, H-18); ctx.lineTo(x-18, H-18-h*.4); ctx.lineTo(x-10, H-18-h*.4);
    ctx.lineTo(x-16, H-18-h*.7); ctx.lineTo(x-7, H-18-h*.7); ctx.lineTo(x, H-18-h);
    ctx.lineTo(x+7, H-18-h*.7); ctx.lineTo(x+16, H-18-h*.7); ctx.lineTo(x+10, H-18-h*.4);
    ctx.lineTo(x+18, H-18-h*.4); ctx.closePath(); ctx.fillStyle='rgba(8,38,12,0.93)'; ctx.fill();
  };
  [18, 48, 88, 138, W-18, W-58, W-98].forEach(x => tree(x, 55+Math.random()*38));
  const cx = W/2; ctx.fillStyle='rgba(12,22,16,0.96)';
  ctx.fillRect(cx-28, H-128, 56, 108);
  for (let i=0; i<4; i++) ctx.fillRect(cx-28+i*15, H-138, 9, 12);
  ctx.fillRect(cx-66, H-96, 32, 78); ctx.fillRect(cx+34, H-96, 32, 78);
  ctx.fillStyle='rgba(255,180,50,0.45)'; ctx.fillRect(cx-7, H-86, 14, 18);
  ctx.fillStyle='rgba(5,18,7,0.85)'; ctx.fillRect(0, H-22, W, 22);
}

function drawFuture(canvas) {
  const ctx = canvas.getContext('2d');
  const W = canvas.width, H = canvas.height;
  ctx.fillStyle='#02030f'; ctx.fillRect(0, 0, W, H);
  const neb = ctx.createRadialGradient(W*.6, H*.3, 8, W*.6, H*.3, 110);
  neb.addColorStop(0,'rgba(26,60,140,0.38)'); neb.addColorStop(0.5,'rgba(80,20,120,0.18)'); neb.addColorStop(1,'transparent');
  ctx.fillStyle=neb; ctx.fillRect(0, 0, W, H);
  for (let i=0; i<85; i++) {
    ctx.beginPath(); ctx.arc(Math.random()*W, Math.random()*H*.7, Math.random()*1.4, 0, Math.PI*2);
    ctx.fillStyle=`rgba(180,200,255,${.25+Math.random()*.7})`; ctx.fill();
  }
  const bldg = (x, w, h) => {
    ctx.fillStyle=`rgba(8,18,38,${.82+Math.random()*.18})`; ctx.fillRect(x, H-h, w, h);
    ctx.fillStyle='rgba(100,200,255,0.28)';
    for (let r=0; r<Math.floor(h/14); r++) for (let c=0; c<Math.floor(w/8); c++)
      if (Math.random()>.42) ctx.fillRect(x+c*8+2, H-h+r*14+3, 4, 5);
    if (w>22) { ctx.fillStyle='rgba(100,200,255,0.55)'; ctx.fillRect(x+w/2-1, H-h-18, 2, 18);
      ctx.beginPath(); ctx.arc(x+w/2, H-h-20, 3, 0, Math.PI*2); ctx.fillStyle='rgba(50,255,200,0.75)'; ctx.fill(); }
  };
  [[0,28,78],[32,18,108],[55,32,68],[95,48,138],[148,24,88],[178,38,155],[225,28,98],[258,18,72],[283,42,118],[332,24,82],[358,32,92]].forEach(([x,w,h])=>bldg(x,w,h));
  ctx.fillStyle='rgba(80,180,255,0.75)';
  [[48,58],[148,38],[275,76],[375,52]].forEach(([x,y])=>{
    ctx.beginPath(); ctx.ellipse(x,y,9,3.5,0,0,Math.PI*2); ctx.fill();
    ctx.beginPath(); ctx.arc(x,y-3,3.5,0,Math.PI*2); ctx.fill();
  });
  const gr = ctx.createLinearGradient(0, H-18, 0, H);
  gr.addColorStop(0,'rgba(20,100,200,0.28)'); gr.addColorStop(1,'transparent');
  ctx.fillStyle=gr; ctx.fillRect(0, H-18, W, 18);
}

// ── Component ─────────────────────────────────────────────────

const RENDERERS = { ancient: drawAncient, medieval: drawMedieval, future: drawFuture };

export default function DestinationCard({ destination, onDetails, onReserve }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const setSize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      RENDERERS[destination.id]?.(canvas);
    };
    setSize();
    window.addEventListener('resize', setSize);
    return () => window.removeEventListener('resize', setSize);
  }, [destination.id]);

  return (
    <article
      className={`${styles.card} ${styles[destination.id]}`}
      onClick={() => onDetails(destination)}
      data-cursor
    >
      <span className={styles.badge}>{destination.era}</span>

      <div className={styles.visual}>
        <canvas ref={canvasRef} className={styles.canvas} />
        <div className={styles.overlay} />
      </div>

      <div className={styles.body}>
        <span className={styles.year}>{destination.period}</span>
        <h3 className={styles.name}>{destination.title}</h3>
        <p className={styles.desc}>{destination.shortDesc}</p>

        <div className={styles.tags}>
          {destination.tags.slice(0, 4).map(tag => (
            <span key={tag} className={styles.tag}>{tag}</span>
          ))}
        </div>

        <div className={styles.footer}>
          <div className={styles.price}>
            {destination.price.toLocaleString('fr-FR')} ⊕
            <span>à partir de / personne</span>
          </div>
          <button
            className={styles.reserveBtn}
            onClick={(e) => { e.stopPropagation(); onReserve(destination.id); }}
          >
            Réserver
          </button>
        </div>
      </div>
    </article>
  );
}
