import yaml from 'js-yaml';
import * as path from 'path';
import * as fs from 'fs';

const readFile = (pathToFile) => {
  try {
    return fs.readFileSync(path.resolve(process.cwd(), pathToFile), { encoding: 'UTF-8' });
  } catch (e) {
    throw new Error(`${pathToFile} path does no exist`);
  }
};

const parsing = (filepath) => {
  switch (path.extname(filepath)) {
    case '.json':
      return JSON.parse(readFile(filepath));
    case '.yml':
      return yaml.safeLoad(readFile(filepath));
    default:
      throw new Error('File has wrong format');
  }
};

export default parsing;
