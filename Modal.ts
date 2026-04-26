class WcModal extends HTMLElement {
  private isOpen = false;

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  open() {
    this.isOpen = true;
    this.render();
  }

  close() {
    this.isOpen = false;
    this.render();
  }

  setupListeners() {
    this.shadowRoot?.addEventListener('click', (e) => {
      const target = e.target as HTMLElement;
      if (target.classList.contains('overlay') || target.classList.contains('close-btn')) {
        this.close();
      }
    });
  }

  render() {
    if (!this.shadowRoot) return;

    this.shadowRoot.innerHTML = `
      <style>
        .trigger-btn { background: #28a745; color: white; border: none; padding: 10px 16px; border-radius: 4px; cursor: pointer; font-weight: bold; }
        .trigger-btn:hover { background: #218838; }
        .overlay {
          display: ${this.isOpen ? 'flex' : 'none'};
          position: fixed; top: 0; left: 0; right: 0; bottom: 0;
          background: rgba(0,0,0,0.5); align-items: center; justify-content: center; z-index: 1000;
        }
        .content { background: white; padding: 24px; border-radius: 8px; min-width: 300px; box-shadow: 0 4px 12px rgba(0,0,0,0.15); }
        .content h3 { margin-top: 0; }
        .close-btn { margin-top: 16px; background: #dc3545; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
        .close-btn:hover { background: #c82333; }
      </style>
      <button class="trigger-btn" onclick="this.getRootNode().host.open()">Открыть WC Модалку</button>
      <div class="overlay">
        <div class="content">
          <h3>Web Component Modal</h3>
          <p>Это окно на нативном Web Component. Состояние меняется через методы класса.</p>
          <button class="close-btn">Закрыть</button>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('wc-modal')) {
  customElements.define('wc-modal', WcModal);
}