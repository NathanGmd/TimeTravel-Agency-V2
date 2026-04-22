import { useRef, useEffect, useState } from 'react';
import { useChat } from '../../hooks/useChat.js';
import styles from './ChatSection.module.css';

const SUGGESTIONS = [
  'Quelles destinations proposez-vous ?',
  'Comment fonctionne la technologie Chronos-Drive ?',
  'Quels sont les tarifs ?',
  'Est-ce sans risque ?',
  'Quelle destination me conseillez-vous pour un premier voyage ?',
];

function formatContent(text) {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>').replace(/\n/g, '<br/>');
}

export default function ChatSection() {
  const { messages, sendMessage, isLoading } = useChat();
  const [input, setInput] = useState('');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  return (
    <section className={styles.section} id="chat">
      <div className={styles.header}>
        <span className="section-eyebrow">— 03 — Conseiller IA</span>
        <h2 className="section-title">Chronos, votre Guide</h2>
        <p className="section-desc">Notre intelligence artificielle temporelle vous conseille personnellement pour créer le voyage de vos rêves.</p>
      </div>

      <div className={styles.chatbox}>
        {/* Top border glow */}
        <div className={styles.topLine} />

        {/* Header */}
        <div className={styles.chatHeader}>
          <div className={styles.avatar}>⏳</div>
          <div>
            <h3 className={styles.agentName}>Chronos — Conseiller Temporel IA</h3>
            <span className={styles.status}>
              <span className={styles.statusDot} />
              En ligne · Disponible 24h/24
            </span>
          </div>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div key={i} className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.bot}`}>
              <div className={styles.msgAvatar}>{msg.role === 'user' ? '👤' : '⏳'}</div>
              <div>
                <div
                  className={styles.bubble}
                  dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
                />
                <span className={styles.time}>
                  {new Date(msg.timestamp).toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>
            </div>
          ))}

          {isLoading && (
            <div className={`${styles.message} ${styles.bot}`}>
              <div className={styles.msgAvatar}>⏳</div>
              <div className={styles.typing}>
                <span /><span /><span />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions */}
        <div className={styles.suggestions}>
          {SUGGESTIONS.map(s => (
            <button key={s} className={styles.suggestion} onClick={() => { sendMessage(s); }}>
              {s}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className={styles.inputArea}>
          <textarea
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Posez votre question à Chronos…"
            rows={1}
          />
          <button
            className={styles.sendBtn}
            onClick={handleSend}
            disabled={isLoading || !input.trim()}
            aria-label="Envoyer"
          >
            ➤
          </button>
        </div>
      </div>
    </section>
  );
}
