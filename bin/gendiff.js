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
arguments('<filepath1> <filepath2>').action(genDiff);
    




  const genDiff = (filepath1, filepath2, options) => {
        
        if(!readFile(filepath1) || !readFile(filepath2) ) {
                return;
        }
      const object1 = convertToJson(filepath1);
      const object2 = convertToJson(filepath2);
      
      if(!object1 || !object2) {
        return;
      }
        // get Keys of obj1 and obj2
      const keyListObj1 // = ke; 
      const keyListObj2;

        //Deleted Fields
        const deletedKeys = keyListObj1.filter((key)=>{
                return !keyListObj2.includes(key)
        })
        //Added Fields
        const addedKeys = keyListObj2.filter((key)=>{
                return !keyListObj1.includes(key)
        })
        //Changed Fields
        const changedKeys = keyListObj1.filter((key)=>{
                if(keyListObj2.includes(key)){
                       return object1[key] !== object1[key] 
                }
        })
       
        const allKeysSorted
        const messages = allKeysSordet.map((key) => {
                if(deletedKeys.includes(key)){
                        return '- ' + key + ': ' +  keyListObj1[key];
                }

                if(addedKeys.includes(key)){
                        return '+ ' + key + ': ' +  keyListObj2[key];
                }

                if(changedKeys.includes(key)){
                        const str =  '- ' + key + ': ' +  keyListObj1[key] +'\n';
                        str +=  '+ ' + key + ': ' +  keyListObj2[key] 
                }
        })




      console.log(object1);
      console.log("aaaaaa");
      console.log(object2.type);
  }

commander.parse(process.argv)





