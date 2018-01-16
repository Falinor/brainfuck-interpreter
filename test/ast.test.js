import test from 'ava';
import sinon from 'sinon';

import createAST from '../src/ast';

test('Should build a new AST', async (t) => {
  const ast = createAST(42);
  t.is(ast.head, 42);
});

test('Should interpret the AST', async (t) => {
  const interpret = sinon.spy();
  const state = 42;
  const ast = createAST({ interpret });
  await ast.interpret(state);
  t.true(interpret.calledOnce);
  t.true(interpret.calledWithExactly(state));
});
