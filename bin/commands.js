const shell = require('shelljs');
const config = require('config');
const colors = require('colors');

const host = config.get('host') || 'localhost';
const port = config.get('port') || '8080';
const s3Deploy = config.get('s3Deploy') || 'false';

const option = process.argv[2];

switch (option) {
  case 'lint':
    shell.exec('eslint src/js/** server/** --format node_modules/eslint-friendly-formatter . --ext .js --ext .jsx  --cache; exit 0');
    break;
  case 'dev':
    shell.exec(`HOST=${host} PORT=${port} webpack-dev-server --hot --progress --inline --colors --content-base ./docroot`);
    break;
  case 'build':
    shell.exec(`rm -rf docroot/assets && S3_DEPLOY=${s3Deploy} NODE_ENV=production webpack --progress`);
    break;
  default:
    // If the app type is invalid, stop execution of the file.
    console.log(colors.green('Invalid option.'));
    console.log(colors.green('See README.md for more details.'));
    return;
}
