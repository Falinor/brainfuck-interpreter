const map = {
  '+': true,
  '-': true,
  '>': true,
  '<': true,
  '.': true,
  // Unused characters
  // ',': true,
  '[': true,
  ']': true,
};

export const lex = async (str) =>
  str.split('').filter(char => map[char] !== undefined);

export default {
  lex,
};
