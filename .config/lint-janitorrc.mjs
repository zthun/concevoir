const generated = [
  "**/CHANGELOG.md",
  "packages/**/dist/**",
  "packages/**/docs/**",
  "packages/**/stats/**",
  "**/node_modules/**",
  "package-lock.json",
  ".yarnrc.yml",
  ".config/cspell.json",
  "lerna.json",
];

const esFiles = [
  "*.{cjs,mjs,js,ts,mts,tsx,jsx}",
  "packages/**/src/**/*.{cjs,mjs,js,ts,mts,tsx,jsx}",
  ".config/**/*.{cjs,mjs,js,ts,mts,tsx,jsx}",
];
const htmlFiles = ["packages/**/*.html"];
const markdownFiles = ["*.md", "packages/**/*.md"];
const jsonFiles = ["*.json", "packages/**/*.json", ".config/**/*.json"];
const yamlFiles = [".circleci/config.yml"];
const prettyFiles = []
  .concat(esFiles)
  .concat(htmlFiles)
  .concat(markdownFiles)
  .concat(jsonFiles)
  .concat(yamlFiles);
const spellingFiles = []
  .concat(esFiles)
  .concat(htmlFiles)
  .concat(markdownFiles)
  .concat(jsonFiles)
  .concat(yamlFiles);

const esFilesExclude = generated;
const htmlFilesExclude = generated;
const markdownFilesExclude = generated;
const jsonFilesExclude = generated;
const yamlFilesExclude = generated;
const prettyFilesExclude = generated;
const spellingFilesExclude = generated;

export default {
  esFiles,
  esFilesExclude,
  htmlFiles,
  htmlFilesExclude,
  markdownFiles,
  markdownFilesExclude,
  jsonFiles,
  jsonFilesExclude,
  yamlFiles,
  yamlFilesExclude,
  prettyFiles,
  prettyFilesExclude,
  spellingFiles,
  spellingFilesExclude,
};
