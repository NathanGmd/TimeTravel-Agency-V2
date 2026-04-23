import { useRef, useEffect, useState } from 'react';
import { useChat } from '../../hooks/useChat.js';
import styles from './ChatWidget.module.css';

const SUGGESTIONS = [
  'Quelle destination me conseillez-vous ?',
  "J'adore les dinosaures !",
  'Quels sont les tarifs ?',
  'Est-ce sans risque ?',
];

function formatContent(text) {
  return text
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/\n/g, '<br/>');
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState('');
  const [hasUnread, setHasUnread] = useState(true);
  const { messages, sendMessage, isLoading } = useChat();
  const messagesEndRef = useRef(null);

  // Scroll to bottom when new message arrives
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setHasUnread(false);
    }
  }, [messages, isLoading, isOpen]);

  // Notification quand fermé et nouveau message
  useEffect(() => {
    if (!isOpen && messages.length > 1) setHasUnread(true);
  }, [messages.length]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    sendMessage(input);
    setInput('');
  };

  const handleKey = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); }
  };

  const handleSuggestion = (s) => {
    sendMessage(s);
  };

  return (
    <div className={styles.wrapper}>
      {/* Fenêtre de chat */}
      <div className={`${styles.window} ${isOpen ? styles.windowOpen : ''}`}>
        {/* Header */}
        <div className={styles.header}>
          <div className={styles.headerLeft}>
            <div className={styles.avatar}>⏳</div>
            <div>
              <p className={styles.agentName}>Chronos</p>
              <span className={styles.status}>
                <span className={styles.statusDot} />
                Conseiller Temporel IA
              </span>
            </div>
          </div>
          <button className={styles.closeBtn} onClick={() => setIsOpen(false)} aria-label="Fermer">✕</button>
        </div>

        {/* Messages */}
        <div className={styles.messages}>
          {messages.map((msg, i) => (
            <div key={i} className={`${styles.message} ${msg.role === 'user' ? styles.user : styles.bot}`}>
              {msg.role === 'assistant' && <div className={styles.msgAvatar}>⏳</div>}
              <div
                className={styles.bubble}
                dangerouslySetInnerHTML={{ __html: formatContent(msg.content) }}
              />
            </div>
          ))}

          {isLoading && (
            <div className={`${styles.message} ${styles.bot}`}>
              <div className={styles.msgAvatar}>⏳</div>
              <div className={styles.typing}><span /><span /><span /></div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Suggestions rapides — seulement au début */}
        {messages.length <= 1 && (
          <div className={styles.suggestions}>
            {SUGGESTIONS.map(s => (
              <button key={s} className={styles.suggestion} onClick={() => handleSuggestion(s)}>
                {s}
              </button>
            ))}
          </div>
        )}

        {/* Input */}
        <div className={styles.inputArea}>
          <textarea
            className={styles.input}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKey}
            placeholder="Posez-moi vos questions sur les voyages temporels…"
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

        {/* Powered by */}
        <div className={styles.powered}>
          Propulsé par <strong>Mistral AI</strong>
        </div>
      </div>

      {/* Bouton flottant */}
      <button
        className={`${styles.fab} ${isOpen ? styles.fabOpen : ''}`}
        onClick={() => { setIsOpen(o => !o); setHasUnread(false); }}
        aria-label="Ouvrir le conseiller IA"
      >
        {isOpen ? (
          <span className={styles.fabIcon}>✕</span>
        ) : (
          <>
            <span className={styles.fabIcon}>⏳</span>
            {hasUnread && <span className={styles.badge} />}
          </>
        )}
      </button>
    </div>
  );
}
