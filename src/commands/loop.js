class Loop {
  constructor(commands) {
    this.commands = commands;
  }

  async interpret(state) {
    let promise;
    while (state.buffer[state.index] !== 0) {
      promise = this.commands.interpret(state);
    }
    return promise;
  }

  toString() {
    return `[${this.commands.toString()}]`;
  }
}

export default commands => new Loop(commands);
