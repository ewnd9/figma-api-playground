const traverse = require('traverse');
const spellchecker = require('spellchecker');
const {argv, fetchApi} = require('../../config');

module.exports = {
  spellcheck,
};

async function spellcheck() {
  const fileKey = argv.id;

  if (!fileKey) {
    console.log('Usage: figma-react --id <file-key>');
    process.exit(0);
  }

  const body = await fetchApi({url: `/v1/files/${fileKey}`})
  const textNodes = getTextNodes(body);
  spellCheckTextNodes(textNodes);
}

function getTextNodes(figFile) {
  return traverse.nodes(figFile)
    .filter(node => hasKey(node, 'type') && node.type === 'TEXT')
}

function postComment(message, x, y) {
  console.log(message, x, y);
  // request.post(
  //   `${api_endpoint}/files/${file_id}/comments`,
  //   {
  //     headers: {
  //       "Content-Type": "application/json",
  //       "x-figma-token": personal_access_token,
  //     },
  //     body: JSON.stringify({
  //       message,
  //       client_meta: {
  //         x,
  //         y,
  //       },
  //     }),
  //   },
  //   requestErrorHandler);
}

function spellCheckTextNodes(textNodes) {
  textNodes.forEach(node => {
    const misspelledWords = spellchecker.checkSpelling(node.characters)
      .map((error) => {
        return node.characters.slice(error.start, error.end)
      });

    if (misspelledWords.length > 0) {
      let annotation = 'You may have several misspellings.\n\n';

      misspelledWords.forEach((word) => {
        annotation += `${word} -> `;
        const corrections = spellchecker.getCorrectionsForMisspelling(word);

        if (corrections.length > 0) {
          annotation += corrections.slice(0, 3).join(', ')
        } else {
          annotation += '???'
        }

        annotation += '\n';
      });

      postComment(annotation, node.absoluteBoundingBox.x, node.absoluteBoundingBox.y);
    }
  })
}

function hasKey(node, key) {
  return node && typeof node === 'object' && key in node;
}
