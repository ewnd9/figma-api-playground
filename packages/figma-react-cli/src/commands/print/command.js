'use strict';

const fs = require('fs');
const path = require('path');
const traverse = require('traverse');
const pick = require('lodash/pick');
const {argv} = require('../../config');

module.exports = {
  print,
};

async function print() {
  const cwd = argv.project && path.resolve(argv.project) || process.cwd();
  const data = JSON.parse(fs.readFileSync(`${cwd}/figma.json`, 'utf-8'));

  const nodes = traverse.nodes(data)
    .filter(node => node && node.type && node.type === argv.type);

  const fields = argv.fields && argv.fields.split(',');

  nodes.forEach(node => {
    if (fields) {
      console.log(pick(node, fields));
    } else {
      console.log(node);
    }
  });
}
