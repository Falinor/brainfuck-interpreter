import test from 'ava';

import lexer from '../src/lexer';

test('Should export a default lexer object', async (t) => {
  t.is(typeof lexer, 'object');
  t.is(typeof lexer.lex, 'function');
});

test('Should lex a string into an array of tokens', async (t) => {
  const str = '+++---';
  const tokens = await lexer.lex(str);
  t.deepEqual(tokens, ['+', '+', '+', '-', '-', '-']);
});

test('Should lex a string containing all of the allowed characters', async (t) => {
  const str = '+-><.[]';
  const tokens = await lexer.lex(str);
  t.deepEqual(tokens, ['+', '-', '>', '<', '.', '[', ']']);
});

test('Should remove any disallowed character', async (t) => {
  const str = '\n + \t- - 91283]ihjfn[vmz,l;a,x;da +';
  const tokens = await lexer.lex(str);
  t.deepEqual(tokens, ['+', '-', '-', ']', '[', '+']);
});

test('Should return an empty array if the string is empty', async (t) => {
  const tokens = await lexer.lex('');
  t.deepEqual(tokens, []);
});
