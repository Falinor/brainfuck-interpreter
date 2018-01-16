import test from 'ava';
import parser from '../src/parser';

test('Should parse a token array and return an AST', async (t) => {
  const tokens = ['+', '+', '-', '[', '-', ']'];
  const ast = await parser.parse(tokens);
  t.is(typeof ast, 'object');
  t.is(typeof ast.head, 'object');
  t.is(ast.head.commandList.length, 4);
  const loop = ast.head.commandList[3];
  t.is(loop.commands.commandList.length, 1);
});

test('Should parse nested loops', async (t) => {
  const tokens = ['[', '[', '-', ']', '-', ']'];
  const ast = await parser.parse(tokens);
  t.is(typeof ast, 'object');
  t.is(typeof ast.head, 'object');
  t.is(ast.head.commandList.length, 1)
  // Get the first loop, which is the first element of the command list
  const [firstLoop] = ast.head.commandList;
  t.is(firstLoop.commands.commandList.length, 2);
  // Get the nested loop, which is the first element of the nested command list
  const [secondLoop] = firstLoop.commands.commandList;
  t.is(secondLoop.commands.commandList.length, 1);
});

test('Should fail to close a missing loop', async (t) => {
  const tokens = [']'];
  const error = await t.throws(parser.parse(tokens));
  t.is(typeof error, 'object');
  t.is(error.name, 'ParseError');
  t.is(error.message, 'Missing open loop');
});

test('Should detect an attempt to close a missing nested loop', async (t) => {
  const tokens = ['[', ']', ']'];
  const error = await t.throws(parser.parse(tokens));
  t.is(typeof error, 'object');
  t.is(error.name, 'ParseError');
  t.is(error.message, 'Missing open loop');
});

test('Should fail if a loop has not been closed', async (t) => {
  const tokens = ['['];
  const error = await t.throws(parser.parse(tokens));
  t.is(typeof error, 'object');
  t.is(error.name, 'ParseError');
  t.is(error.message, 'Non-closed loop');
});

test('Should detect non-closed nested loop', async (t) => {
  const tokens = ['[', '[', ']'];
  const error = await t.throws(parser.parse(tokens));
  t.is(typeof error, 'object');
  t.is(error.name, 'ParseError');
  t.is(error.message, 'Non-closed loop');
});
