class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'lotto-generator');

    const controls = document.createElement('div');
    controls.setAttribute('class', 'controls');

    const button = document.createElement('button');
    button.textContent = 'Generate 5 Sets of Numbers';
    button.addEventListener('click', () => this.generateFiveSets());

    const themeToggle = document.createElement('button');
    themeToggle.setAttribute('class', 'theme-toggle');
    themeToggle.textContent = '🌓 Toggle Mode';
    themeToggle.addEventListener('click', () => this.toggleTheme());

    const setsContainer = document.createElement('div');
    setsContainer.setAttribute('class', 'lotto-sets-container');

    const style = document.createElement('style');
    style.textContent = `
      :host {
        display: block;
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      }
      .lotto-generator {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 20px;
        background: var(--container-bg, #f9f9f9);
        border-radius: 12px;
        box-shadow: 0 4px 15px var(--shadow-color, rgba(0,0,0,0.1));
        max-width: 600px;
        margin: 20px auto;
        transition: background 0.3s, box-shadow 0.3s;
      }
      .controls {
        display: flex;
        gap: 10px;
        margin-bottom: 25px;
      }
      button {
        padding: 12px 24px;
        font-size: 18px;
        font-weight: bold;
        color: white;
        background: linear-gradient(135deg, #6e8efb, #a777e3);
        border: none;
        border-radius: 30px;
        cursor: pointer;
        transition: transform 0.2s, box-shadow 0.2s, opacity 0.2s;
        box-shadow: 0 4px 10px rgba(110, 142, 251, 0.4);
      }
      .theme-toggle {
        background: linear-gradient(135deg, #444, #222);
        font-size: 14px;
        padding: 8px 16px;
      }
      button:hover {
        transform: translateY(-2px);
        opacity: 0.9;
      }
      button:active {
        transform: translateY(0);
      }
      .lotto-sets-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        gap: 15px;
      }
      .lotto-row {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 10px;
        background: var(--card-bg, white);
        border-radius: 8px;
        box-shadow: 0 2px 5px var(--shadow-color, rgba(0,0,0,0.05));
        transition: background 0.3s;
      }
      .lotto-ball {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        font-weight: bold;
        color: white;
        text-shadow: 1px 1px 1px rgba(0,0,0,0.2);
      }
      .bonus-plus {
        font-size: 20px;
        font-weight: bold;
        color: var(--text-color, #666);
        margin: 0 5px;
      }
      .color-1 { background: radial-gradient(circle at 30% 30%, #fbc400, #d4a700); }
      .color-2 { background: radial-gradient(circle at 30% 30%, #69c8f2, #4a9ec4); }
      .color-3 { background: radial-gradient(circle at 30% 30%, #ff7272, #d64d4d); }
      .color-4 { background: radial-gradient(circle at 30% 30%, #aaaaaa, #888888); }
      .color-5 { background: radial-gradient(circle at 30% 30%, #b0d840, #8eb231); }
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(controls);
    controls.appendChild(button);
    controls.appendChild(themeToggle);
    wrapper.appendChild(setsContainer);
  }

  toggleTheme() {
    const body = document.body;
    const currentTheme = body.getAttribute('data-theme');
    if (currentTheme === 'dark') {
      body.removeAttribute('data-theme');
    } else {
      body.setAttribute('data-theme', 'dark');
    }
  }

  generateFiveSets() {
    const setsContainer = this.shadowRoot.querySelector('.lotto-sets-container');
    setsContainer.innerHTML = '';

    for (let i = 0; i < 5; i++) {
      const set = this.createSingleSet();
      setsContainer.appendChild(set);
    }
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

    const row = document.createElement('div');
    row.setAttribute('class', 'lotto-row');

    for (const number of sortedNumbers) {
      row.appendChild(this.createBall(number));
    }

    const plus = document.createElement('span');
    plus.setAttribute('class', 'bonus-plus');
    plus.textContent = '+';
    row.appendChild(plus);

    row.appendChild(this.createBall(bonusNumber));

    return row;
  }

  createBall(number) {
    const ball = document.createElement('div');
    ball.setAttribute('class', `lotto-ball color-${this.getColorForNumber(number)}`);
    ball.textContent = number;
    return ball;
  }

  getColorForNumber(number) {
    if (number <= 10) return 1;
    if (number <= 20) return 2;
    if (number <= 30) return 3;
    if (number <= 40) return 4;
    return 5;
  }
}

customElements.define('lotto-generator', LottoGenerator);

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(button);
    wrapper.appendChild(setsContainer);
  }

  generateFiveSets() {
    const setsContainer = this.shadowRoot.querySelector('.lotto-sets-container');
    setsContainer.innerHTML = ''; // Clear previous sets

    for (let i = 0; i < 5; i++) {
      const set = this.createSingleSet();
      setsContainer.appendChild(set);
    }
  }

  createSingleSet() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    
    // Generate bonus number
    let bonusNumber;
    do {
      bonusNumber = Math.floor(Math.random() * 45) + 1;
    } while (numbers.has(bonusNumber));

    const row = document.createElement('div');
    row.setAttribute('class', 'lotto-row');

    // Add main balls
    for (const number of sortedNumbers) {
      row.appendChild(this.createBall(number));
    }

    // Add plus sign
    const plus = document.createElement('span');
    plus.setAttribute('class', 'bonus-plus');
    plus.textContent = '+';
    row.appendChild(plus);

    // Add bonus ball
    row.appendChild(this.createBall(bonusNumber));

    return row;
  }

  createBall(number) {
    const ball = document.createElement('div');
    ball.setAttribute('class', `lotto-ball color-${this.getColorForNumber(number)}`);
    ball.textContent = number;
    return ball;
  }

  getColorForNumber(number) {
    if (number <= 10) return 1;
    if (number <= 20) return 2;
    if (number <= 30) return 3;
    if (number <= 40) return 4;
    return 5;
  }
}

customElements.define('lotto-generator', LottoGenerator);
