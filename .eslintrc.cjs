const options = require('@zthun/lint-janitor-config/eslint');
options.rules['brace-style'] = 'off';
options.env = { node: true, browser: true };
module.exports = options;
