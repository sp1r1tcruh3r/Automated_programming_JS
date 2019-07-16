/*


В unix существует такая утилита как awk, она позволяет проводить различные манипуляции с входным потоком (текстом) и получать на выходе новый текст. Например иногда, бывает нужно взять вывод одной программы и оставить от него только первый столбец. Пример:

ls -la

drwxr-xr-x  14 mokevnin  staff  476 Dec  9 20:31 .
drwxr-xr-x   3 mokevnin  staff  102 Dec  9 20:29 ..
-rw-r--r--   1 mokevnin  staff    0 Dec  9 20:31 .bash_history
-rw-r--r--   1 mokevnin  staff  117 Dec  9 20:29 .eslintrc.yml

ls -la | awk '{print $1}'

drwxr-xr-x
drwxr-xr-x
-rw-r--r--
-rw-r--r--

solution.js

Реализуйте и экспортируйте функцию по умолчанию, которая принимает на вход текст и возвращает массив состоящий из первых слов каждой строки текста. Пустые строчки должны игнорироваться.

    Строки разделяются переводом строки
    В любом месте строки может быть сколько угодно пробелов
    Текст должен перебираться посимвольно (мы пишем лексер)

const text = '  what who   \nhellomy\n hello who are you\n';
const result = solution(text);
// [
//   'what',
//   'hellomy',
//   'hello',
// ];

Решение должно быть автоматным
Подсказки

    Управляющие символы, такие как \t, \n называются словом символы, потому что это одиночные символы. А запись \n всего лишь представление.

*/
const solution = text =>{
  let words = text.split('\n')
  let normalized = words.map(elem=>elem.trim())
  const firstWord = normalized.map(elem=>elem.replace(/ .*/, ''))
  const final = firstWord.filter(el => el!=='')
  return final;
}
export default solution

// BEGIN
export default (text) => {
  const result = [];
  // before, inside, after
  let state = 'before';
  let word = [];
  Array.from(text).forEach((symbol) => {
    if (symbol === '\n' && word.length > 0) {
      result.push(word.join(''));
      word = [];
      state = 'before';
    }
    switch (state) {
      case 'before':
        if (symbol !== ' ' && symbol !== '\n') {
          state = 'inside';
          word.push(symbol);
        }
        break;
      case 'inside':
        if (symbol !== ' ') {
          word.push(symbol);
        } else {
          state = 'after';
        }
        break;
      case 'after':
        break;
      default:
        throw new Error(`Unexpected state '${state}'`);
    }
  });

  if (word.length > 0) {
    result.push(word.join(''));
  }

  return result;
};
