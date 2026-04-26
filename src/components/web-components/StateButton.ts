class WcStateButton extends HTMLElement {
  private isSubscribed = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  toggleState() {
    this.isSubscribed = !this.isSubscribed;
    this.render(); // В Web Components мы вручную вызываем перерисовку при изменении состояния
  }

  setupListeners() {
    this.shadowRoot?.addEventListener('click', (e) => {
      if ((e.target as HTMLElement).tagName === 'BUTTON') {
        this.toggleState();
      }
    });
  }

  render() {
    if (!this.shadowRoot) return;

    const bgColor = this.isSubscribed ? '#6c757d' : '#28a745';
    const text = this.isSubscribed ? '✓ Вы подписаны' : '+ Подписаться';

    this.shadowRoot.innerHTML = `
      <style>
        button {
          background: ${bgColor}; color: white; border: none; padding: 10px 20px;
          border-radius: 20px; cursor: pointer; font-weight: bold; transition: background 0.3s ease;
        }
        button:hover { filter: brightness(0.9); }
      </style>
      <button>${text}</button>
    `;
  }
}

if (!customElements.get('wc-state-button')) {
  customElements.define('wc-state-button', WcStateButton);
}