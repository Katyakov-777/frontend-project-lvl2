#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../src/gendiff-logic.js';

commander
  .description('Compares two configuration files and shows a difference.')
  .version('0.1')
  .option('-f, --format [type]', 'output format', 'json')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const message = genDiff(filepath1, filepath2);
      console.log(message);
    } catch (error) {
      console.log(error.toString());
    }
  });
commander.parse(process.argv);
