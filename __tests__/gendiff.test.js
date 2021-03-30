import { fileURLToPath } from 'url';
import { dirname } from 'path';
import * as fs from 'fs';
import * as path from 'path';
import genDiff from '../src/gendiff.js';

const isJsonParsable = (string) => {
  try {
    JSON.parse(string);
  } catch (e) {
    return false;
  }
  return true;
};

// eslint-disable-next-line no-underscore-dangle
const __filename = fileURLToPath(import.meta.url);
// eslint-disable-next-line no-underscore-dangle
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');
// const fileWithResultName = 'expected_file.txt';
const fileWithResultForStylish = 'stylish_output.txt';
const fileWithResultForPlain = 'plain_output.txt';

// eslint-disable-next-line no-undef
test('genDiff-json', () => {
  const path1 = getFixturePath('json_before.json');
  const path2 = getFixturePath('json_after.json');
  // eslint-disable-next-line no-undef
  expect(genDiff(path1, path2, 'stylish')).toBe(readFile(fileWithResultForStylish));
  // eslint-disable-next-line no-undef
  expect(genDiff(path1, path2, 'plain')).toBe(readFile(fileWithResultForPlain));
  // eslint-disable-next-line no-undef
  expect(isJsonParsable(genDiff(path1, path2, 'json'))).toBe(true);
});

// eslint-disable-next-line no-undef
test('genDiff-yaml', () => {
  const path1Yaml = getFixturePath('yaml_before.yml');
  const path2Yaml = getFixturePath('yaml_after.yml');
  // eslint-disable-next-line no-undef
  expect(genDiff(path1Yaml, path2Yaml, 'stylish')).toBe(readFile(fileWithResultForStylish));
  // eslint-disable-next-line no-undef
  expect(genDiff(path1Yaml, path2Yaml, 'plain')).toBe(readFile(fileWithResultForPlain));
  // eslint-disable-next-line no-undef
  expect(isJsonParsable(genDiff(path1Yaml, path2Yaml, 'json'))).toBe(true);
});
// eslint-disable-next-line no-undef
test('genDiff-yaml-hexlet', () => {
  const path1Yaml = getFixturePath('file1.yml');
  const path2Yaml = getFixturePath('file2.yml');
  // eslint-disable-next-line no-undef
  expect(genDiff(path1Yaml, path2Yaml)).toBe(readFile('result_stylish.txt'));
});
