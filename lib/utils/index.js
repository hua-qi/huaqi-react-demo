const { commandSpawn } = require("./terminal");
const { compile, writeToFile } = require("./template-compile");
const { changeConfig } = require("./changeConfig");

module.exports = {
  commandSpawn,
  compile,
  writeToFile,
  changeConfig,
};
