'use strict';

const path = require('path');
const fetch = require('node-fetch');
const argv = require('minimist')(process.argv.slice(2), { string: '_' });

const devToken = process.env.DEV_TOKEN;
const baseUrl = 'https://api.figma.com';
const headers = new fetch.Headers();
headers.append('X-Figma-Token', devToken);

module.exports = {
  argv,
  fetchApi,
};

async function fetchApi({url}) {
  const resp = await fetch(`${baseUrl}${url}`, {headers});
  const data = await resp.json();
  return data;
}
