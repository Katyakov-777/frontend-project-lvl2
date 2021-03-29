import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import showChanges from '../src/index.js';
import parsing from '../src/parsing.js';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const fileWithResultName = 'expected_file.txt';
let object1 = parsing(getFixturePath('test3.json'));
let object2 = parsing(getFixturePath('test4.json'));

// eslint-disable-next-line no-undef
test('genDiff-json', () => {
  // eslint-disable-next-line no-undef
  expect(showChanges(object1, object2)).toBe(readFile(fileWithResultName));
});

// eslint-disable-next-line no-undef
test('genDiff-yaml', () => {
  object1 = parsing(getFixturePath('test5.yml'));
  object2 = parsing(getFixturePath('test6.yml'));
  // eslint-disable-next-line no-undef
  expect(showChanges(object1, object2)).toBe(readFile(fileWithResultName));
});
