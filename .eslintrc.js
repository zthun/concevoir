const options = require('@zthun/lint-janitor-config/eslint');
options.rules['@typescript-eslint/no-namespace'] = 'off';
options.rules['@typescript-eslint/no-unsafe-declaration-merging'] = 'off';
options.rules['brace-style'] = 'off';
module.exports = options;
