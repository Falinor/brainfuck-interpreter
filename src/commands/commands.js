class Commands {
  constructor(commandList = []) {
    this.commandList = commandList;
  }

  async interpret(state) {
    const promises = this.commandList.map(command => command.interpret(state));
    return Promise.all(promises);
  }

  toString() {
    return this.commandList.map(command => command.toString());
  }
}

export default commandList => new Commands(commandList);
