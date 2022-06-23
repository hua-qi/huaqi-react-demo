const path = require("path");
const fs = require("fs");

const changeConfig = (oldValue, nextValue) => {
  const repoConfigPath = path.resolve(__dirname, "../config/repo-config.js");
  const configfile = fs.readFileSync(repoConfigPath, { encoding: "utf-8" });
  const result = configfile.replace(oldValue, nextValue);
  fs.writeFileSync(repoConfigPath, result);
};

module.exports = {
  changeConfig,
};
