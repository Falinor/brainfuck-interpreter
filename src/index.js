import fs from 'fs';
import path from 'path';

import createInterpreter from './interpreter';

// Read sampe Brainfuck file
const file = path.join(__dirname, '..', 'assets', 'hello-world.bf');
fs.readFile(file, 'utf8', (err, data) => {
  if (err) throw err;

  // Create interpreter
  const interpreter = createInterpreter();
  // Interpret the file content
  interpreter.interpret(data)
    .then(console.log)
    .catch(console.error);
})

