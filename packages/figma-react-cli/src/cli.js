const {sync} = require('./commands/sync/command');
const {generate} = require('./commands/generate/command');
const {spellcheck} = require('./commands/spellcheck/command');
const {argv} = require('./config');

async function main() {
  if (argv.sync) {
    await sync();
  } else if (argv.generate) {
    await generate();
  } else if (argv.spellcheck) {
    await spellcheck();
  }
}

main().catch((err) => {
  console.error(err);
  console.error(err.stack);
});
