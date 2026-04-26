class WcItemList extends HTMLElement {
  private items: string[] = ['Элемент 1', 'Элемент 2'];

  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  addItem(text: string) {
    if (text.trim()) {
      this.items.push(text.trim());
      this.render();
    }
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
    this.render();
  }

  setupListeners() {
    const input = this.shadowRoot?.querySelector('input');
    const addBtn = this.shadowRoot?.querySelector('.add-btn');
    
    addBtn?.addEventListener('click', () => {
      if (input) this.addItem(input.value);
    });

    const removeBtns = this.shadowRoot?.querySelectorAll('.remove-btn');
    removeBtns?.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const index = (e.target as HTMLElement).dataset.index;
        if (index !== undefined) this.removeItem(parseInt(index, 10));
      });
    });
  }

  render() {
    if (!this.shadowRoot) return;

    const itemsHtml = this.items.length > 0 
      ? this.items.map((item, index) => `
          <li>
            <span>${item}</span>
            <button class="remove-btn" data-index="${index}">Удалить</button>
          </li>
        `).join('')
      : `<li class="empty">Список пуст</li>`;

    this.shadowRoot.innerHTML = `
      <style>
        .container { background: white; padding: 16px; border-radius: 8px; border: 1px solid #ccc; }
        .input-group { display: flex; gap: 8px; margin-bottom: 16px; }
        input { flex: 1; padding: 8px; border-radius: 4px; border: 1px solid #ccc; font-family: inherit; }
        .add-btn { background: #28a745; color: white; border: none; padding: 8px 16px; border-radius: 4px; cursor: pointer; }
        ul { list-style: none; padding: 0; margin: 0; display: flex; flex-direction: column; gap: 8px; }
        li { display: flex; justify-content: space-between; align-items: center; padding: 8px; background: #f8f9fa; border-radius: 4px; border: 1px solid #e9ecef; }
        li.empty { justify-content: center; color: #6c757d; background: transparent; border: none; }
        .remove-btn { background: #dc3545; color: white; border: none; padding: 4px 8px; border-radius: 4px; cursor: pointer; font-size: 0.8rem; }
      </style>
      <div class="container">
        <div class="input-group">
          <input type="text" placeholder="Новый элемент" />
          <button class="add-btn">Добавить</button>
        </div>
        <ul>${itemsHtml}</ul>
      </div>
    `;

    this.setupListeners();
  }
}

if (!customElements.get('wc-item-list')) {
  customElements.define('wc-item-list', WcItemList);
}