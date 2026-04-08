import fs from 'fs'
import path from 'path'
import parse from './parsers/index.js'
import buildTree from './buildTree.js'
import format from './formatters/index.js'

const getData = (filepath) => {
  const absolutePath = path.resolve(filepath)
  const ext = path.extname(filepath).slice(1)

  const content = fs.readFileSync(absolutePath, 'utf-8')

  return parse(content, ext)
}

const genDiff = (filepath1, filepath2, formatName = 'stylish') => {
  const data1 = getData(filepath1)
  const data2 = getData(filepath2)

  const tree = buildTree(data1, data2)

  return format(tree, formatName)
}

export default genDiff
