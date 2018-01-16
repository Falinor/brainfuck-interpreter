const lexer = require('./lexer');
const parser = require('./parser');

export const SIZE = 30000;
export const FILL = 0;
export const ENC = 'ascii';

/**
 *
 */
class Interpreter {
  /**
   *
   * @param buffer
   * @param index
   */
  constructor(buffer, index) {
    this.buffer = buffer;
    this.index = index;
  }

  /**
   *
   * @param str
   * @returns {Promise<String>}
   */
  async interpret(str) {
    const tokens = await lexer.lex(str);
    const ast = await parser.parse(tokens);
    await ast.interpret(this.state);
    return `\nResult:
    length: ${this.buffer.length}
    `
  }

  get state() {
    return {
      buffer: this.buffer,
      index: this.index,
    }
  }
}

/**
 *
 * @param buffer
 * @param index
 * @returns {Interpreter}
 */
export default (buffer = Buffer.alloc(SIZE, FILL, ENC), index = 0) =>
  new Interpreter(buffer, index);
