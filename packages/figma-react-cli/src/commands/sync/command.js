'use strict';

const fs = require('fs');
const path = require('path');
const {argv, fetchApi} = require('../../config');

module.exports = {
  sync,
};

async function sync() {
  const fileKey = argv.id;
  const cwd = argv.project && path.resolve(argv.project) || process.cwd();

  if (!fileKey) {
    console.log('Usage: figma-react --id <file-key> [--project cwd]');
    process.exit(0);
  }

  const data = await fetchApi({url: `/v1/files/${fileKey}`});
  fs.writeFileSync(`${cwd}/figma.json`, JSON.stringify(data));
}
