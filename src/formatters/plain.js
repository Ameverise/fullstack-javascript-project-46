import _ from 'lodash';

const formatValue = (value) => {
  if (_.isObject(value)) {
    return '[complex value]';
  }

  if (_.isString(value)) {
    return `'${value}'`;
  }

  if (value === null) {
    return null;
  }

  return value;
};

const buildPlain = (tree, parentPath = '') => {
  const lines = tree.flatMap((node) => {
    const propertyPath = parentPath
      ? `${parentPath}.${node.key}`
      : node.key;

    switch (node.type) {
      case 'added':
        return `Property '${propertyPath}' was added with value: ${formatValue(node.value)}`;

      case 'removed':
        return `Property '${propertyPath}' was removed`;

      case 'changed':
        return `Property '${propertyPath}' was updated. From ${formatValue(node.value1)} to ${formatValue(node.value2)}`;

      case 'nested':
        return buildPlain(node.children, propertyPath);

      case 'unchanged':
        return [];

      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default (tree) => buildPlain(tree);