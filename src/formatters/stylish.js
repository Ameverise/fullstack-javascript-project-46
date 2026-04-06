import _ from 'lodash';

const replacer = ' ';
const spacesCount = 4;

const getIndent = (depth) => replacer.repeat(depth * spacesCount - 2);

const stringify = (value, depth) => {
  if (!_.isObject(value)) return value;

  const indent = getIndent(depth + 1);

  const bracketIndent = getIndent(depth);

  const lines = Object.entries(value)
    .map(([key, val]) => `${indent}  ${key}: ${stringify(val, depth + 1)}`);

  return ['{', ...lines, `${bracketIndent}  }`].join('\n');
};

const stylish = (tree, depth = 1) => {
  const indent = getIndent(depth);

  const lines = tree.map((node) => {
    switch (node.type) {
      case 'added':
        return `${indent}+ ${node.key}: ${stringify(node.value, depth)}`;

      case 'removed':
        return `${indent}- ${node.key}: ${stringify(node.value, depth)}`;

      case 'unchanged':
        return `${indent}  ${node.key}: ${stringify(node.value, depth)}`;

      case 'changed':
        return [
          `${indent}- ${node.key}: ${stringify(node.value1, depth)}`,
          `${indent}+ ${node.key}: ${stringify(node.value2, depth)}`,
        ].join('\n');

      case 'nested':
        return `${indent}  ${node.key}: {\n${stylish(node.children, depth + 1)}\n${indent}  }`;

      default:
        throw new Error(`Unknown type: ${node.type}`);
    }
  });

  return lines.join('\n');
};

export default (tree) => `{\n${stylish(tree)}\n}`;