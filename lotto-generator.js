class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  toggleTheme() {
    const body = document.body;
    const isDark = body.getAttribute('data-theme') === 'dark';
    if (isDark) {
      body.removeAttribute('data-theme');
    } else {
      body.setAttribute('data-theme', 'dark');
    }
    this.render(); // Re-render to update toggle button text
  }

  getColorForNumber(number) {
    if (number <= 10) return 'yellow';
    if (number <= 20) return 'blue';
    if (number <= 30) return 'red';
    if (number <= 40) return 'gray';
    return 'green';
  }

  createSingleSet() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    
    let bonusNumber;
    do {
      bonusNumber = Math.floor(Math.random() * 45) + 1;
    } while (numbers.has(bonusNumber));

    return { main: sortedNumbers, bonus: bonusNumber };
  }

  generateFiveSets() {
    const container = this.shadowRoot.querySelector('.sets-container');
    container.innerHTML = '';
    
    for (let i = 0; i < 5; i++) {
      const setData = this.createSingleSet();
      const row = document.createElement('div');
      row.className = 'lotto-row';

      setData.main.forEach(num => {
        const ball = document.createElement('div');
        ball.className = `ball ${this.getColorForNumber(num)}`;
        ball.textContent = num;
        row.appendChild(ball);
      });

      const plus = document.createElement('div');
      plus.className = 'plus';
      plus.textContent = '+';
      row.appendChild(plus);

      const bonusBall = document.createElement('div');
      bonusBall.className = `ball ${this.getColorForNumber(setData.bonus)} bonus`;
      bonusBall.textContent = setData.bonus;
      const bonusLabel = document.createElement('span');
      bonusLabel.className = 'bonus-label';
      bonusLabel.textContent = 'Bonus';
      bonusBall.appendChild(bonusLabel);
      row.appendChild(bonusBall);

      container.appendChild(row);
    }
  }

  render() {
    const isDark = document.body.getAttribute('data-theme') === 'dark';
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          width: 100%;
          max-width: 600px;
          margin: 0 auto;
        }
        .container {
          background: var(--container-bg, #ffffff);
          padding: 1.5rem 1rem;
          border-radius: 20px;
          box-shadow: 0 10px 30px var(--shadow-color);
          transition: all 0.3s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 100%;
          box-sizing: border-box;
        }
        .controls {
          display: flex;
          gap: 0.8rem;
          margin-bottom: 1.5rem;
          width: 100%;
          justify-content: center;
        }
        button {
          padding: 0.7rem 1.2rem;
          border: none;
          border-radius: 50px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.2s, box-shadow 0.2s;
          font-size: 0.9rem;
          white-space: nowrap;
        }
        .btn-generate {
          background: linear-gradient(135deg, #6e8efb, #a777e3);
          color: white;
          box-shadow: 0 4px 15px rgba(110, 142, 251, 0.3);
          flex: 2;
        }
        .btn-theme {
          background: var(--card-bg);
          color: var(--text-color);
          border: 1px solid #ddd;
          flex: 1;
        }
        button:hover {
          transform: translateY(-2px);
          box-shadow: 0 6px 20px rgba(0,0,0,0.15);
        }
        .sets-container {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }
        .lotto-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 5px;
          padding: 0.8rem;
          background: var(--card-bg);
          border-radius: 12px;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          flex-wrap: nowrap; /* Keep them in a single line */
        }
        .ball {
          width: 32px;
          height: 32px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          font-weight: bold;
          font-size: 0.9rem;
          text-shadow: 1px 1px 2px rgba(0,0,0,0.2);
          position: relative;
          flex-shrink: 0;
        }
        @media (min-width: 480px) {
          .ball {
            width: 40px;
            height: 40px;
            font-size: 1.1rem;
          }
          .lotto-row {
            gap: 0.5rem;
            padding: 1rem;
          }
          .container {
            padding: 2rem;
          }
          button {
            font-size: 1rem;
          }
        }
        .yellow { background: radial-gradient(circle at 30% 30%, #fbc400, #d4a700); }
        .blue   { background: radial-gradient(circle at 30% 30%, #69c8f2, #4a9ec4); }
        .red    { background: radial-gradient(circle at 30% 30%, #ff7272, #d64d4d); }
        .gray   { background: radial-gradient(circle at 30% 30%, #aaaaaa, #888888); }
        .green  { background: radial-gradient(circle at 30% 30%, #b0d840, #8eb231); }
        
        .plus {
          font-weight: bold;
          font-size: 1.2rem;
          color: var(--text-color);
          margin: 0 0.1rem;
        }
        .ball.bonus .bonus-label {
          position: absolute;
          top: -12px;
          font-size: 0.5rem;
          background: #333;
          color: white;
          padding: 1px 3px;
          border-radius: 3px;
          text-transform: uppercase;
        }
      </style>
      <div class="container">
        <div class="controls">
          <button class="btn-generate">✨ Generate 5 Sets</button>
          <button class="btn-theme">${isDark ? '☀️ Light Mode' : '🌙 Dark Mode'}</button>
        </div>
        <div class="sets-container">
          <!-- Rows will be injected here -->
        </div>
      </div>
    `;

    this.shadowRoot.querySelector('.btn-generate').addEventListener('click', () => this.generateFiveSets());
    this.shadowRoot.querySelector('.btn-theme').addEventListener('click', () => this.toggleTheme());
  }
}

customElements.define('lotto-generator', LottoGenerator);
