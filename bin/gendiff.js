#!/usr/bin/env node
import commander from 'commander';
import parsing from '../src/parsing.js';
import showChanges from '../src/index.js';

commander
  .description('Compares two configuration files and shows a difference.')
  .version('0.1')
  .option('-f, --format [type]', 'output format', 'json')
  .arguments('<filepath1> <filepath2>')
  .action((filepath1, filepath2) => {
    try {
      const object1 = parsing(filepath1);
      const object2 = parsing(filepath2);
      console.log(showChanges(object1, object2));
    } catch (error) {
      console.log(error.toString());
    }
  });
commander.parse(process.argv);
