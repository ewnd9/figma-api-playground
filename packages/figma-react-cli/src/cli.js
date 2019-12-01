const {sync} = require('./commands/sync/command');
const {generate} = require('./commands/generate/command');
const {argv} = require('./config');

async function main() {
  if (argv.sync) {
    await sync();
  } else if (argv.generate) {
    await generate();
  }
}

main().catch((err) => {
  console.error(err);
  console.error(err.stack);
});
