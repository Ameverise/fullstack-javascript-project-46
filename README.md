# Gendiff — Difference Calculator

Gendiff is a command‑line utility that compares two configuration files and shows their differences.

Supported formats:

* JSON
* YAML / YML

The tool outputs differences in a human‑readable format and is designed as part of a learning project focused on building CLI utilities and working with AST‑style data comparison.

---

## Features

* Compare two files
* Supports JSON and YAML formats
* Stylish output formatter
* CLI usage support
* ES Modules compatible
* Tested with automated tests

---

## Installation

Clone repository:

```bash
git clone <your-repository-url>
cd gendiff
```

Install dependencies:

```bash
npm install
```

---

## Usage

Run from terminal:

```bash
npx gendiff filepath1 filepath2
```

Example:

```bash
gendiff file1.json file2.json
```

Example output:

```text
{
    common: {
      + follow: false
        setting1: Value 1
      - setting2: 200
      - setting3: true
      + setting3: null
    }
    group1: {
      - baz: bas
      + baz: bars
    }
}
```

---

## Project Structure

```text
bin/
  gendiff.js      CLI entry point

code/
  index.js        library entry point

src/
  genDiff.js      main comparison logic
  parsers.js      file parsing logic
  formatters/
    stylish.js    stylish formatter
```

---

## Development

Run tests:

```bash
npm test
```

Run linter:

```bash
npm run lint
```

---

## Technologies Used

* Node.js
* Commander
* Lodash
* Jest
* ESLint
* js-yaml
