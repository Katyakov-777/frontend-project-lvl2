import _ from 'lodash';

const stringify = (value, space) => {
  if (_.isBoolean(value) || _.isNull(value)
  || _.isString(value) || _.isNumber(value)) {
    return value;
  }

  const indent = ' '.repeat(space + 6);
  const indentObject = ' '.repeat(space + 2);

  const keys = Object.keys(value);
  const values = keys.map((name) => {
    const valueKey = value[name];

    if (typeof valueKey === 'object') {
      return `${indent}${name}: ${stringify(valueKey, space + 4)}\n`;
    }
    return `${indent}${name}: ${valueKey}\n`;
  });
  return `{\n${values.join('')}${indentObject}}`;
};

const stylish = (diff, space = 2) => {
  const indent = ' '.repeat(space);
  const indentObject = ' '.repeat(space + 2);
  const processNode = (node) => {
    const {
      name,
      type,
      children,
      currentValue,
      previousValue,
    } = node;

    switch (type) {
      case 'nested':
        return `${indentObject}${name}: {\n${stylish(children, space + 4)}\n${indentObject}}`;
      case 'added':
        return `${indent}+ ${name}: ${stringify(currentValue, space)}`;
      case 'deleted':
        return `${indent}- ${name}: ${stringify(currentValue, space)}`;
      case 'changed':
        return `${indent}- ${name}: ${stringify(previousValue, space)}\n${indent}+ ${name}: ${stringify(currentValue, space)}`;
      case 'unchanged':
        return `${indentObject}${name}: ${stringify(currentValue, space)}`;
      default:
        throw new Error(`Error`);
    }
  };
 
  const renderedDiff = diff.map((node) => processNode(node)).join('\n');
  //const renderedDiff = diff.map((node) => console.log(node));
  return renderedDiff;
};

const genDiff = (object1, object2) => {
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
        if(_.isObject(object1[key]) && _.isObject(object2[key])){
          return false;
        } else{
          return object1[key] !== object2[key];
        }
    }
    return false;
  });

  const allKeysUniqSorted = _.uniq(keyListObj1.concat(keyListObj2)).sort();

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
        children: genDiff(object1[key], object2[key]),
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

export {genDiff, stylish};
