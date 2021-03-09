import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import genDiff from '../src/gendiff-logic';

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
const fileWithResultName = 'expected_file.txt';

// eslint-disable-next-line no-undef
test('genDiff-json', () => {
  // eslint-disable-next-line no-undef
  expect(genDiff(getFixturePath('test1.json'), getFixturePath('test2.json'))).toBe(readFile(fileWithResultName));
});

// eslint-disable-next-line no-undef
test('genDiff-yaml', () => {
  // eslint-disable-next-line no-undef
  expect(genDiff(getFixturePath('test3.yml'), getFixturePath('test4.yml'))).toBe(readFile(fileWithResultName));
});
