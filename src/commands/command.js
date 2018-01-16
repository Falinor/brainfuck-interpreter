export const increment = state => state.buffer[state.index]++;

export const decrement = state => state.buffer[state.index]--;

export const moveLeft = state => state.index--;

export const moveRight = state => state.index++;

export const print = state =>
  process.stdout.write(String.fromCharCode(state.buffer[state.index]));

const map = {
  '+': increment,
  '-': decrement,
  '<': moveLeft,
  '>': moveRight,
  '.': print,
};

class Command {
  constructor(symbol) {
    this.symbol = symbol;
  }

  async interpret(state) {
    return map[this.symbol](state);
  }

  toString() {
    return this.symbol;
  }
}

export default symbol => new Command(symbol);
