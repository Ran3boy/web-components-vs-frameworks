class WcFeedbackForm extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  setupListeners() {
    const form = this.shadowRoot?.querySelector('form');
    const button = this.shadowRoot?.querySelector('button');
    
    form?.addEventListener('submit', (e) => {
      e.preventDefault();
      if (button) {
        button.textContent = '✓ Отправлено!';
        button.style.background = '#218838'; // Darker green for feedback
        form.reset();
        setTimeout(() => {
          button.textContent = 'Отправить';
          button.style.background = '#28a745'; // Original green
        }, 3000);
      }
    });
  }

  render() {
    if (!this.shadowRoot) return;
    this.shadowRoot.innerHTML = `
      <style>
        form { display: flex; flex-direction: column; gap: 12px; background: white; padding: 16px; border-radius: 8px; border: 1px solid #ccc; }
        input, textarea { padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-family: inherit; }
        textarea { resize: vertical; }
        button { background: #28a745; color: white; border: none; padding: 10px; border-radius: 4px; cursor: pointer; font-weight: bold; transition: background 0.3s; }
        button:hover { filter: brightness(0.9); }
      </style>
      <form>
        <input type="text" placeholder="Ваше имя" required />
        <input type="email" placeholder="Email" required />
        <textarea placeholder="Сообщение" required rows="3"></textarea>
        <button type="submit">Отправить</button>
      </form>
    `;
  }
}

if (!customElements.get('wc-feedback-form')) {
  customElements.define('wc-feedback-form', WcFeedbackForm);
}