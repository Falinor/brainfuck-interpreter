import test from 'ava';
import sinon from 'sinon';

import createCommands from '../../src/commands/commands';

test('Should create a new Commands object with an empty command list', async (t) => {
  const commands = createCommands();
  t.is(typeof commands, 'object');
  t.deepEqual(commands.commandList, []);
});

test('Should create a new Commands object with a command list', async (t) => {
  const commandList = [
    {},
    {},
  ];
  const commands = createCommands(commandList);
  t.deepEqual(commands.commandList, commandList);
});

test('Should interpret each command in the command list', async (t) => {
  const interpret = sinon.spy();
  const commandList = [
    { interpret },
    { interpret },
  ];
  const commands = createCommands(commandList);
  await t.notThrows(commands.interpret());
  t.true(interpret.calledTwice);
});

test('Should call toString() on each command in the command list', async (t) => {
  const toString = sinon.stub().returns('+');
  const commandList = [
    { toString },
    { toString },
  ];
  const commands = createCommands(commandList);
  const symbols = commands.toString();
  t.true(Array.isArray(symbols));
  symbols.forEach(symbol => {
    t.is(typeof symbol, 'string');
  });
});
