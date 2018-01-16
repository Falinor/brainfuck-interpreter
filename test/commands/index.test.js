import test from 'ava';

import {
  decrement,
  increment,
  moveLeft,
  moveRight,
  print,
  createCommand,
  createCommands,
  createLoop,
} from '../../src/commands';

test('Should export functions', async (t) => {
  t.is(typeof decrement, 'function');
  t.is(typeof increment, 'function');
  t.is(typeof moveLeft, 'function');
  t.is(typeof moveRight, 'function');
  t.is(typeof print, 'function');
  t.is(typeof createCommand, 'function');
  t.is(typeof createCommands, 'function');
  t.is(typeof createLoop, 'function');
});
