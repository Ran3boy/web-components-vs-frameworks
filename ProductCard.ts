class WcProductCard extends HTMLElement {
  static get observedAttributes() {
    return ['product-id', 'name', 'description', 'price', 'image-url'];
  }

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
    this.setupListeners();
  }

  attributeChangedCallback() {
    this.render();
  }

  setupListeners() {
    const button = this.shadowRoot?.querySelector('button');
    if (button) {
      button.addEventListener('click', () => {
        const event = new CustomEvent('add-to-cart', {
          detail: { id: this.getAttribute('product-id') },
          bubbles: true,
          composed: true,
        });
        this.dispatchEvent(event);
      });
    }
  }

  render() {
    if (!this.shadowRoot) return;
    const name = this.getAttribute('name') || '';
    const desc = this.getAttribute('description') || '';
    const price = this.getAttribute('price') || '';
    const imageUrl = this.getAttribute('image-url') || '';

    this.shadowRoot.innerHTML = `
      <style>
        .wc-product-card {
          border: 1px solid #ccc;
          border-radius: 8px;
          padding: 16px;
          background: white;
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        img { width: 100%; height: 200px; object-fit: cover; border-radius: 4px; }
        h4 { margin: 0; font-size: 1.2rem; }
        p { margin: 0; color: #666; font-size: 0.9rem; }
        .price { font-weight: bold; font-size: 1.1rem; }
        button {
          background: #28a745; color: white; border: none; padding: 10px 16px;
          border-radius: 4px; cursor: pointer; font-weight: bold;
        }
        button:hover { background: #218838; }
      </style>
      <div class="wc-product-card">
        <img src="${imageUrl}" alt="${name}" />
        <div class="content">
          <h4>${name} (Web Component)</h4>
          <p>${desc}</p>
          <div class="price">${price} ₽</div>
          <button>В корзину</button>
        </div>
      </div>
    `;
  }
}

if (!customElements.get('wc-product-card')) {
  customElements.define('wc-product-card', WcProductCard);
}