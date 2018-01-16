import createAST from './ast';
import {
  createCommand,
  createCommands,
  createLoop,
} from './commands';

const operations = {
  INCR_OP: '+',
  DECR_OP: '-',
  MOVE_LEFT: '<',
  MOVE_RIGHT: '>',
  PRINT: '.',
  /* Unused operations
  SCAN: ',',
  */
  START_LOOP: '[',
  END_LOOP: ']',
};

const parse = async (tokens) => {
  const ast = createAST();
  ast.head = createCommands();
  // Handle loops using a stack
  const stack = [];

  const reduce = async (commands, index) => {
    const token = tokens[index];
    switch (token) {
      case operations.INCR_OP:
      case operations.DECR_OP:
      case operations.MOVE_LEFT:
      case operations.MOVE_RIGHT:
      case operations.PRINT:
        const command = createCommand(token);
        commands.commandList.push(command);
        return reduce(commands, index + 1);
      case operations.START_LOOP:
        // Create a loop
        const loop = createLoop(createCommands());
        // Push the loop into the current commands
        commands.commandList.push(loop);
        // Save the current commands before looping through the nested ones
        stack.push(commands);
        // Go on to the nested commands
        return reduce(loop.commands, index + 1);
      case operations.END_LOOP:
        // Pop back the last saved state
        commands = stack.pop();
        // Detect attempts to close missing loops
        if (!commands) {
          const error = new Error('Missing open loop');
          error.name = 'ParseError';
          throw error;
        }
        // Go on to the next token
        return reduce(commands, index + 1);
      default:
        break;
    }
  };
  // Start the reducer
  await reduce(ast.head, 0);
  // Detect non-closed loops
  if (stack.length > 0) {
    const error = new Error('Non-closed loop');
    error.name = 'ParseError';
    throw error;
  }
  return ast;
};

module.exports = {
  parse,
};
