import { createChat } from 'https://cdn.jsdelivr.net/npm/@n8n/chat@1.46.5/dist/chat.bundle.es.js';

createChat({
  webhookUrl: 'https://agenticflows.tokencraze.org/webhook/42ef025a-20aa-4b4f-9cba-5112d2267102/chat',
  mode: 'window',
  loadPreviousSession: false,
  showWelcomeScreen: false,
  initialMessages: [
    'Hello. What would you like to know?',
    'Ask me about the JS-SEZ Playbook.'
  ],
  i18n: {
    en: {
      title: 'JS-SEZ advisor',
      subtitle: 'Ask a question about the Playbook',
      inputPlaceholder: 'Ask a question...'
    }
  }
});

const setChatToggleAccessibility = () => {
  const toggle = document.querySelector('.chat-window-toggle');
  if (!toggle) return;

  toggle.setAttribute('role', 'button');
  toggle.setAttribute('tabindex', '0');
  toggle.setAttribute('aria-label', 'Toggle the JS-SEZ advisor chat');

  const chatWindow = document.querySelector('.chat-window');
  if (chatWindow) {
    chatWindow.id = 'jssez-advisor-window';
    toggle.setAttribute('aria-controls', chatWindow.id);
  }
};

const chatObserver = new MutationObserver(setChatToggleAccessibility);
chatObserver.observe(document.body, { childList: true, subtree: true });
setChatToggleAccessibility();

document.addEventListener('keydown', (event) => {
  if (!(event.target instanceof Element)) return;
  const toggle = event.target.closest('.chat-window-toggle');
  if (!toggle || (event.key !== 'Enter' && event.key !== ' ')) return;

  event.preventDefault();
  toggle.click();
});
