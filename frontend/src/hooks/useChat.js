import { useState, useCallback } from 'react';
import { chatApi } from '../services/api.js';

const INITIAL_MESSAGE = {
  role: 'assistant',
  content: 'Bonjour, voyageur ! Je suis **Chronos**, votre conseiller en voyages temporels. Quelle époque vous attire le plus ? Je peux vous aider à choisir votre destination, répondre à vos questions ou vous guider dans votre réservation.',
  timestamp: new Date().toISOString(),
};

export function useChat() {
  const [messages, setMessages] = useState([INITIAL_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendMessage = useCallback(async (content) => {
    if (!content.trim() || isLoading) return;

    const userMsg = { role: 'user', content: content.trim(), timestamp: new Date().toISOString() };
    const updatedMessages = [...messages, userMsg];

    setMessages(updatedMessages);
    setIsLoading(true);
    setError(null);

    try {
      // On envoie uniquement role+content à l'API (sans timestamp)
      const apiMessages = updatedMessages.map(({ role, content }) => ({ role, content }));
      const response = await chatApi.send(apiMessages);
      setMessages(prev => [...prev, response.data]);
    } catch (err) {
      setError(err.message);
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          content: 'Les interférences temporelles perturbent ma connexion... Veuillez réessayer.',
          timestamp: new Date().toISOString(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  }, [messages, isLoading]);

  return { messages, sendMessage, isLoading, error };
}
