/**
 * @class
 */
class AST {
  /**
   *
   * @param head
   */
  constructor(head) {
    this.head = head;
  }

  /**
   * k
   * @returns {Promise<*>}
   */
  async interpret(state) {
    return this.head.interpret(state);
  }

  toString() {
    this.head.toString();
  }
}

/**
 *
 * @param commands
 * @returns {AST}
 */
export default commands => new AST(commands);
