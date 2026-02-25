class LottoGenerator extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });

    const wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'lotto-generator');

    const button = document.createElement('button');
    button.textContent = 'Generate Numbers';
    button.addEventListener('click', () => this.generateNumbers());

    const numbersDiv = document.createElement('div');
    numbersDiv.setAttribute('class', 'lotto-numbers');

    const style = document.createElement('style');
    style.textContent = `
      .lotto-generator {
        display: flex;
        flex-direction: column;
        align-items: center;
      }
      .lotto-numbers {
        margin-top: 20px;
        display: flex;
        gap: 10px;
      }
      .lotto-ball {
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 24px;
        font-weight: bold;
        color: white;
      }
      .color-1 { background-color: #FBC400; } /* Yellow */
      .color-2 { background-color: #69C8F2; } /* Blue */
      .color-3 { background-color: #FF7272; } /* Red */
      .color-4 { background-color: #AAAAAA; } /* Gray */
      .color-5 { background-color: #B0D840; } /* Green */
    `;

    shadow.appendChild(style);
    shadow.appendChild(wrapper);
    wrapper.appendChild(button);
    wrapper.appendChild(numbersDiv);
  }

  generateNumbers() {
    const numbers = new Set();
    while (numbers.size < 6) {
      numbers.add(Math.floor(Math.random() * 45) + 1);
    }
    const sortedNumbers = [...numbers].sort((a, b) => a - b);
    
    const numbersDiv = this.shadowRoot.querySelector('.lotto-numbers');
    numbersDiv.innerHTML = ''; // Clear previous numbers

    for (const number of sortedNumbers) {
      const ball = document.createElement('div');
      ball.setAttribute('class', `lotto-ball color-${this.getColorForNumber(number)}`);
      ball.textContent = number;
      numbersDiv.appendChild(ball);
    }
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
