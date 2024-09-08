const config = require("@zthun/lint-janitor-config/eslint-react");
config.rules = config.rules || {};
config.rules["react/react-in-jsx-scope"] = "off";
config.env = { node: true };
module.exports = config;
