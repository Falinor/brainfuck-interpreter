import test from 'ava';
import sinon from 'sinon';

import createCommand, {
  decrement,
  increment,
  moveLeft,
  moveRight,
  print,
} from '../../src/commands/command';

test.beforeEach('Create context', async (t) => {
  t.context = {
    state: {
      buffer: Buffer.alloc(42, 0, 'ascii'),
      index: 0,
    },
  };
});

test('Should increment a cell value', async (t) => {
  const { state } = t.context;
  t.is(state.buffer[state.index], 0);
  increment(state);
  t.is(state.buffer[state.index], 1);
});

test('Should decrement a cell value', async (t) => {
  const { state } = t.context;
  state.buffer[state.index] = 1;
  t.is(state.buffer[state.index], 1);
  decrement(state);
  t.is(state.buffer[state.index], 0);
});

test('Should move the pointer to the left', async (t) => {
  const { state } = t.context;
  state.index = 1;
  t.is(state.index, 1);
  moveLeft(state);
  t.is(state.index, 0);
});

test('Should move the pointer to the right', async (t) => {
  const { state } = t.context;
  t.is(state.index, 0);
  moveRight(state);
  t.is(state.index, 1);
});

test('Should print the pointed cell', async (t) => {
  const { state } = t.context;
  const write = sinon.stub(process.stdout, 'write');
  state.buffer[state.index] = 72;
  print(state);
  t.true(write.calledOnce);
  t.true(write.calledWithExactly('H'));
  write.restore();
});

test('Should build a new command', async (t) => {
  const command = createCommand('+');
  t.is(typeof command, 'object');
  t.is(command.symbol, '+');
});

test('Should call the increment function if the command is built with a "+" symbol', async (t) => {
  const { state } = t.context;
  const command = createCommand('+');
  const promise = command.interpret(state);
  await t.notThrows(promise);
  t.is(state.buffer[0], 1);
});

test('Should return the underlying symbol', async (t) => {
  const command = createCommand('<');
  const symbol = command.toString();
  t.is(symbol, '<');
});
