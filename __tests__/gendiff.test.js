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

const pathTofile1Name = getFixturePath('test1.json');
const pathTofile2Name = getFixturePath('test2.json');
const fileWithResultName = 'expected_file.txt';

// eslint-disable-next-line no-undef
test('genDiff', () => {
  // eslint-disable-next-line no-undef
  expect(genDiff(pathTofile1Name, pathTofile2Name)).toBe(readFile(fileWithResultName));
});
