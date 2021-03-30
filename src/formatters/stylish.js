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

const convertToStylish = (diff, space = 2) => {
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
        return `${indentObject}${name}: {\n${convertToStylish(children, space + 4)}\n${indentObject}}`;
      case 'added':
        return `${indent}+ ${name}: ${stringify(currentValue, space)}`;
      case 'deleted':
        return `${indent}- ${name}: ${stringify(currentValue, space)}`;
      case 'changed':
        return `${indent}- ${name}: ${stringify(previousValue, space)}\n${indent}+ ${name}: ${stringify(currentValue, space)}`;
      case 'unchanged':
        return `${indentObject}${name}: ${stringify(currentValue, space)}`;
      default:
        throw new Error('Unsupported type');
    }
  };
  const renderedDiff = diff.map((node) => processNode(node)).join('\n');
  return renderedDiff;
};

const stylish = (diff) => `{\n${convertToStylish(diff)}\n}\n`;

export default stylish;
