#!/usr/bin/env node
import commander from 'commander';
import * as fs from 'fs';
import * as path from 'path';

const readFile = (pathToFile) => {
        try{
                return fs.readFileSync(path.resolve(process.cwd(), pathToFile), {encoding: 'UTF-8'});
        } catch(e){
                console.log(pathToFile + " is wrong. No file was found")
                return undefined;
        }
}

const convertToJson = (filepath) => {
        try{
             return JSON.parse(readFile(filepath))
        } catch(e) {
                console.log(filepath + " file has wrong format")
                return undefined; 
        }
}
commander.
description('Compares two configuration files and shows a difference.').
version('0.1').
option('-f, --format [type]', 'output format', 'json').
arguments('<filepath1> <filepath2>').action((filepath1, filepath2, options) => {
        
        if(!readFile(filepath1) || !readFile(filepath2) ) {
                return;
        }
      const file1 = convertToJson(filepath1);
      const file2 = convertToJson(filepath2);
      if(!file1 || !file2) {
        return;
      }
      console.log(file1.name);
      console.log("aaaaaa");
      console.log(file2.type);
  });
    

commander.parse(process.argv)





