#!/usr/bin/env node
import commander from 'commander';
import * as fs from 'fs';
import * as path from 'path';
import _ from 'lodash';

const readFile = (pathToFile) => {
  try {
    return fs.readFileSync(path.resolve(process.cwd(), pathToFile), { encoding: 'UTF-8' });
  } catch (e) {
    console.log(`${pathToFile} is wrong. No file was found`);
    return undefined;
  }
};

const convertToJson = (filepath) => {
  try {
    return JSON.parse(readFile(filepath));
  } catch (e) {
    console.log(`${filepath} file has wrong format`);
    return undefined;
  }
};

const genDiff = (filepath1, filepath2) => {
  if (!readFile(filepath1) || !readFile(filepath2)) {
    return;
  }
  const object1 = convertToJson(filepath1);
  const object2 = convertToJson(filepath2);

  if (!object1 || !object2) {
    return;
  }
  // get Keys of obj1 and obj2
  const keyListObj1 = Object.keys(object1);
  const keyListObj2 = Object.keys(object2);

  // Deleted Fields
  const deletedKeys = keyListObj1.filter((key) => !keyListObj2.includes(key));
  // Added Fields
  const addedKeys = keyListObj2.filter((key) => !keyListObj1.includes(key));
  // Changed Fields
  const changedKeys = keyListObj1.filter((key) => {
    if (keyListObj2.includes(key)) {
      return object1[key] !== object2[key];
    }
  });

  const allKeysUniqSorted = _.uniq(keyListObj1.concat(keyListObj2)).sort();

  const messages = allKeysUniqSorted.map((key) => {
    if (deletedKeys.includes(key)) {
      console.log();
      return `- ${key}: ${object1[key]}`;
    }

    if (addedKeys.includes(key)) {
      return `+ ${key}: ${object2[key]}`;
    }

    if (changedKeys.includes(key)) {
      const str1 = `- ${key}: ${object1[key]}`;
      const str2 = `+ ${key}: ${object2[key]}`;
      return [str1, str2];
    }
    return `${key}: ${object1[key]}`;
  });

  console.log(messages.flat().join('\n'));
};
commander
  .description('Compares two configuration files and shows a difference.')
  .version('0.1')
  .option('-f, --format [type]', 'output format', 'json')
  .arguments('<filepath1> <filepath2>')
  .action(genDiff);
commander.parse(process.argv);
