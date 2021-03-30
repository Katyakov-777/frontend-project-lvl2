#!/usr/bin/env node
import commander from 'commander';
import genDiff from '../index.js';

commander
  .description('Compares two configuration files and shows a difference.')
  .version('0.1')
  .option('-f, --format [type]', 'output format', 'stylish')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2, { format }) => {
    try {
      console.log(genDiff(filepath1, filepath2, format));
    } catch (error) {
      console.log(error.toString());
    }
  });

commander.parse(process.argv);
