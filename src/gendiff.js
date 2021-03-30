import _ from 'lodash';
import parsing from './parsing.js';
import format from './formatters/index.js';

const convertDataToObjects = (filePath1, filePath2) => {
  const object1 = parsing(filePath1);
  const object2 = parsing(filePath2);
  return [object1, object2];
};

const identifyChangedKeys = (object1, object2) => {
  const keyListObj1 = Object.keys(object1);
  const keyListObj2 = Object.keys(object2);
  return keyListObj1.filter((key) => {
    if (keyListObj2.includes(key)) {
      if (_.isObject(object1[key]) && _.isObject(object2[key])) {
        return false;
      }
      return object1[key] !== object2[key];
    }
    return false;
  });
};

const findDifference = (object1, object2) => {
  const keyListObj1 = Object.keys(object1);
  const keyListObj2 = Object.keys(object2);

  // Deleted Fields
  const deletedKeys = keyListObj1.filter((key) => !keyListObj2.includes(key));
  // Added Fields
  const addedKeys = keyListObj2.filter((key) => !keyListObj1.includes(key));
  // Changed Fields
  const changedKeys = identifyChangedKeys(object1, object2);

  const allKeysUniqSorted = _.sortBy(_.uniq(keyListObj1.concat(keyListObj2)));

  const diffTree = allKeysUniqSorted.map((key) => {
    if (deletedKeys.includes(key)) {
      return {
        type: 'deleted',
        name: key,
        currentValue: object1[key],
      };
    }

    if (addedKeys.includes(key)) {
      return {
        type: 'added',
        name: key,
        currentValue: object2[key],
      };
    }

    if (changedKeys.includes(key)) {
      return {
        type: 'changed',
        name: key,
        currentValue: object2[key],
        previousValue: object1[key],
      };
    }

    if (_.isObject(object1[key]) && _.isObject(object2[key])) {
      return {
        type: 'nested',
        name: key,
        children: findDifference(object1[key], object2[key]),
      };
    }
    return {
      type: 'unchanged',
      name: key,
      currentValue: object1[key],
    };
  });
  return diffTree;
};

const genDiff = (filePath1, filePath2, formatName = 'stylish') => {
  // get Keys of obj1 and obj2
  const [object1, object2] = convertDataToObjects(filePath1, filePath2);
  const diffTree = findDifference(object1, object2);
  return `${format(formatName)(diffTree)}`;
};

export default genDiff;
