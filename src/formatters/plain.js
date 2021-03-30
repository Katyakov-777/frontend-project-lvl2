import _ from 'lodash';

const getValue = (value) => {
  if (_.isBoolean(value) || _.isNull(value)) {
    return value;
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  if (typeof value === 'object') {
    return '[complex value]';
  }
  return value;
};

const plain = (diff, nameKeyParent = '') => {
  const processNode = (node) => {
    const {
      name,
      type,
      children,
      currentValue,
      previousValue,
    } = node;

    const currentPath = `${nameKeyParent}${name}`;

    // eslint-disable-next-line default-case
    switch (type) {
      case 'nested':
        return plain(children, `${currentPath}.`);

      case 'added':
        return `Property '${currentPath}' was added with value: ${getValue(currentValue)}`;

      case 'deleted':
        return `Property '${currentPath}' was removed`;

      case 'changed':
        return `Property '${currentPath}' was updated. From ${getValue(previousValue)} to ${getValue(currentValue)}`;

      case 'unchanged':
        return '';
      default:
        throw new Error(`unexpected type ${type}`);
    }
  };
  const renderedDiff = diff.map((node) => processNode(node)).filter((node) => (node !== '')).join('\n');
  return renderedDiff;
};

export default plain;
