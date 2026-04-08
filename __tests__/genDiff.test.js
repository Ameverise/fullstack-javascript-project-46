import genDiff from '../src/index.js'
import path from 'path'
import fs from 'fs'

const getFixturePath = (filename)
  path.join(process.cwd(), '__fixtures__', filename)

const readFixture = (filename)
  fs.readFileSync(getFixturePath(filename), 'utf-8')

const expected = readFixture('resultStylish.txt')

test('gendiff json stylish', () => {
  const file1 = getFixturePath('file1.json')
  const file2 = getFixturePath('file2.json')

  console.log(genDiff(file1, file2))

  expect(genDiff(file1, file2)).toBe(expected)
})

test('gendiff yaml stylish', () => {
  const file1 = getFixturePath('file1.yaml')
  const file2 = getFixturePath('file2.yaml')

  expect(genDiff(file1, file2)).toBe(expected)
})
