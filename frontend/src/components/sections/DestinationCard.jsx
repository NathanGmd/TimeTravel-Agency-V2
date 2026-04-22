import { useEffect, useRef } from 'react';
import styles from './DestinationCard.module.css';

// ── Canvas renderers ──────────────────────────────────────────

function drawParis1889(canvas) {
  const ctx = canvas.getContext('2d'); const W = canvas.width, H = canvas.height;
  // Ciel crépuscule Belle Époque
  const sky = ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#1a0f2e'); sky.addColorStop(0.5,'#4a2060'); sky.addColorStop(1,'#c4702a');
  ctx.fillStyle=sky; ctx.fillRect(0,0,W,H);
  // Étoiles
  for(let i=0;i<35;i++){ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*.5,Math.random()*.9,0,Math.PI*2);ctx.fillStyle='rgba(255,240,180,.8)';ctx.fill();}
  // Lune
  ctx.beginPath();ctx.arc(W*.15,H*.18,18,0,Math.PI*2);ctx.fillStyle='rgba(255,240,200,.9)';ctx.fill();
  // Tour Eiffel silhouette
  const cx=W/2;
  ctx.fillStyle='rgba(15,8,25,.95)';
  ctx.beginPath();ctx.moveTo(cx,H*.08);ctx.lineTo(cx-8,H*.35);ctx.lineTo(cx-22,H*.35);ctx.lineTo(cx-30,H*.55);ctx.lineTo(cx-16,H*.55);ctx.lineTo(cx-20,H*.75);ctx.lineTo(cx+20,H*.75);ctx.lineTo(cx+16,H*.55);ctx.lineTo(cx+30,H*.55);ctx.lineTo(cx+22,H*.35);ctx.lineTo(cx+8,H*.35);ctx.closePath();ctx.fill();
  // Plateforme
  ctx.fillRect(cx-28,H*.34,56,5); ctx.fillRect(cx-22,H*.54,44,5);
  // Lumières fenêtres haussmann
  const bldg=(x,w,h)=>{ctx.fillStyle=`rgba(12,6,22,.92)`;ctx.fillRect(x,H-h,w,h);for(let r=0;r<Math.floor(h/12);r++)for(let c=0;c<Math.floor(w/9);c++)if(Math.random()>.4){ctx.fillStyle='rgba(255,200,80,.45)';ctx.fillRect(x+c*9+2,H-h+r*12+3,5,5);}};
  [0,38,75,W-38,W-75].forEach(x=>bldg(x,35,60+Math.random()*40));
  // Sol
  ctx.fillStyle='rgba(10,5,20,.9)';ctx.fillRect(0,H-18,W,18);
  // Reflets dorés sur le sol
  const gr=ctx.createLinearGradient(0,H-18,0,H);gr.addColorStop(0,'rgba(255,180,50,.15)');gr.addColorStop(1,'transparent');ctx.fillStyle=gr;ctx.fillRect(0,H-18,W,18);
}

function drawCretace(canvas) {
  const ctx = canvas.getContext('2d'); const W = canvas.width, H = canvas.height;
  // Ciel préhistorique
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#0a1a05');sky.addColorStop(0.4,'#1a3a0a');sky.addColorStop(0.7,'#2a5a10');sky.addColorStop(1,'#3a6a15');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Soleil
  const sg=ctx.createRadialGradient(W*.7,H*.15,5,W*.7,H*.15,60);
  sg.addColorStop(0,'rgba(255,240,150,.9)');sg.addColorStop(.4,'rgba(255,200,80,.4)');sg.addColorStop(1,'transparent');
  ctx.fillStyle=sg;ctx.fillRect(0,0,W,H);
  // Fougères géantes fond
  const fern=(x,h,w)=>{ctx.fillStyle='rgba(15,50,8,.9)';for(let i=0;i<8;i++){ctx.beginPath();const bx=x+(i-4)*w*.15,by=H-h*.3;ctx.moveTo(bx,by);ctx.quadraticCurveTo(bx-w*.4,by-h*.5,bx-w*.3,H-h);ctx.quadraticCurveTo(bx,by-h*.3,bx+w*.3,H-h);ctx.quadraticCurveTo(bx+w*.4,by-h*.5,bx,by);ctx.fill();}};
  [20,70,W-40,W-90].forEach(x=>fern(x,120+Math.random()*60,50));
  // Dinosaure silhouette (T-Rex simplifié)
  ctx.fillStyle='rgba(8,25,5,.95)';
  const dx=W*.38,dy=H*.62;
  // Corps
  ctx.beginPath();ctx.ellipse(dx,dy,38,22,-.2,0,Math.PI*2);ctx.fill();
  // Tête
  ctx.beginPath();ctx.ellipse(dx+48,dy-18,22,14,.3,0,Math.PI*2);ctx.fill();
  // Mâchoire
  ctx.beginPath();ctx.moveTo(dx+36,dy-10);ctx.lineTo(dx+68,dy-8);ctx.lineTo(dx+66,dy-4);ctx.lineTo(dx+35,dy-6);ctx.fill();
  // Pattes
  ctx.fillRect(dx-10,dy+18,12,28);ctx.fillRect(dx+10,dy+18,12,28);
  // Queue
  ctx.beginPath();ctx.moveTo(dx-35,dy);ctx.quadraticCurveTo(dx-65,dy+10,dx-75,dy-5);ctx.lineWidth=14;ctx.strokeStyle='rgba(8,25,5,.95)';ctx.stroke();ctx.lineWidth=1;
  // Végétation premier plan
  ctx.fillStyle='rgba(10,40,5,.95)';ctx.fillRect(0,H-30,W,30);
  for(let i=0;i<12;i++){const gx=i*(W/11);ctx.beginPath();ctx.moveTo(gx,H);ctx.quadraticCurveTo(gx-15+Math.random()*30,H-40-Math.random()*30,gx-8+Math.random()*16,H);ctx.fillStyle=`rgba(10,${40+Math.random()*20},5,.9)`;ctx.fill();}
}

function drawFlorence1504(canvas) {
  const ctx = canvas.getContext('2d'); const W = canvas.width, H = canvas.height;
  // Ciel toscan coucher de soleil
  const sky=ctx.createLinearGradient(0,0,0,H);
  sky.addColorStop(0,'#0d0a1a');sky.addColorStop(0.4,'#3a1a0a');sky.addColorStop(0.7,'#8a3a0a');sky.addColorStop(1,'#c06020');
  ctx.fillStyle=sky;ctx.fillRect(0,0,W,H);
  // Étoiles
  for(let i=0;i<25;i++){ctx.beginPath();ctx.arc(Math.random()*W,Math.random()*H*.45,Math.random()*.8,0,Math.PI*2);ctx.fillStyle='rgba(255,230,150,.6)';ctx.fill();}
  // Dôme Brunelleschi (Duomo)
  const cx=W/2;
  // Tambour
  ctx.fillStyle='rgba(20,10,5,.95)';ctx.fillRect(cx-35,H*.35,70,H*.25);
  // Dôme principal
  ctx.beginPath();ctx.moveTo(cx-35,H*.35);ctx.quadraticCurveTo(cx-40,H*.1,cx,H*.05);ctx.quadraticCurveTo(cx+40,H*.1,cx+35,H*.35);ctx.closePath();ctx.fill();
  // Lanterne
  ctx.fillRect(cx-5,H*.02,10,H*.05);
  // Croix
  ctx.fillRect(cx-1,H*-.01,2,H*.04);ctx.fillRect(cx-5,H*.01,10,2);
  // Clocher Giotto à gauche
  ctx.fillStyle='rgba(18,8,4,.9)';ctx.fillRect(cx-95,H*.2,28,H*.55);
  for(let i=0;i<4;i++){ctx.fillStyle='rgba(255,180,50,.2)';ctx.fillRect(cx-91,H*.22+i*H*.08,20,H*.05);}
  ctx.fillRect(cx-91,H*.18,20,8);
  // Bâtiments Renaissance
  const rbldg=(x,w,h)=>{ctx.fillStyle=`rgba(15,7,3,.88)`;ctx.fillRect(x,H-h,w,h);for(let r=0;r<3;r++)for(let c=0;c<Math.floor(w/14);c++){ctx.fillStyle='rgba(255,160,40,.3)';ctx.beginPath();ctx.arc(x+c*14+7,H-h+r*18+12,4,Math.PI,0);ctx.fill();ctx.fillRect(x+c*14+3,H-h+r*18+8,8,8);}};
  rbldg(0,55,85);rbldg(58,45,65);rbldg(W-55,55,75);rbldg(W-100,42,60);
  // Sol — reflets rouges/oranges
  ctx.fillStyle='rgba(12,5,2,.85)';ctx.fillRect(0,H-20,W,20);
  const gr=ctx.createLinearGradient(0,H-20,0,H);gr.addColorStop(0,'rgba(180,80,20,.2)');gr.addColorStop(1,'transparent');ctx.fillStyle=gr;ctx.fillRect(0,H-20,W,20);
}

const RENDERERS = {
  paris1889:   drawParis1889,
  cretace:     drawCretace,
  florence1504: drawFlorence1504,
};

export default function DestinationCard({ destination, onDetails, onReserve }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const draw = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      RENDERERS[destination.id]?.(canvas);
    };
    draw();
    window.addEventListener('resize', draw);
    return () => window.removeEventListener('resize', draw);
  }, [destination.id]);

  return (
    <article className={`${styles.card} ${styles[destination.id] || styles.default}`} onClick={() => onDetails(destination)} data-cursor>
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
          {destination.tags.slice(0,4).map(tag => <span key={tag} className={styles.tag}>{tag}</span>)}
        </div>
        <div className={styles.footer}>
          <div className={styles.price}>
            {destination.price.toLocaleString('fr-FR')} ⊕
            <span>à partir de / personne</span>
          </div>
          <button className={styles.reserveBtn} onClick={e => { e.stopPropagation(); onReserve(destination.id); }}>
            Réserver
          </button>
        </div>
      </div>
    </article>
  );
}
