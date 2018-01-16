import test from 'ava';
import sinon from 'sinon';

import createLoop from '../../src/commands/loop';

test('Should create a Loop object', async (t) => {
  const loop = createLoop({ commandList: [] });
  t.deepEqual(loop.commands, { commandList: [] });
});

test('Should interpret each command', async (t) => {
  const loop = createLoop({ interpret: sinon.stub().resolves(), });
  const state = {
    buffer: Buffer.alloc(42, 0, 'ascii'),
    index: 0,
  }
  const promise = loop.interpret(state);
  await t.notThrows(promise);
});

test('Should call toString() on the underlying commands', async (t) => {
  const loop = createLoop({ toString: sinon.spy() });
  loop.toString();
  t.true(loop.commands.toString.calledOnce);
});
