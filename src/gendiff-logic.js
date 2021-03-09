import _ from 'lodash';
import parsing from './parsing.js';

const genDiff = (filepath1, filepath2) => {
  const object1 = parsing(filepath1);
  const object2 = parsing(filepath2);

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
    return false;
  });

  const allKeysUniqSorted = _.uniq(keyListObj1.concat(keyListObj2)).sort();

  const messages = allKeysUniqSorted.map((key) => {
    if (deletedKeys.includes(key)) {
      return `  - ${key}: ${object1[key]}`;
    }

    if (addedKeys.includes(key)) {
      return `  + ${key}: ${object2[key]}`;
    }

    if (changedKeys.includes(key)) {
      const str1 = `  - ${key}: ${object1[key]}`;
      const str2 = `  + ${key}: ${object2[key]}`;
      return [str1, str2];
    }
    return `    ${key}: ${object1[key]}`;
  });

  // eslint-disable-next-line consistent-return
  return (`{
  ${messages.flat().join('\n  ')}
}`);
};

export default genDiff;
