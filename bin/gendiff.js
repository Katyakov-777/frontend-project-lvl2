#!/usr/bin/env node
import commander from 'commander';

commander.
description('Compares two configuration files and shows a difference.').
version('0.1').
option('-f, --format [type]', 'output format', 'json').
arguments('<filepath1> <filepath2>').action((filepath1, filepath2, options) => {
        
  });
    

commander.parse(process.argv)





