const path = require("path");
const fs = require("fs");

const ejs = require("ejs");

const compile = async (templateName, data) => {
  // 获取模板文件路径
  const templatePosition = `../templates/${templateName}`;
  const templatePath = path.resolve(__dirname, templatePosition);

  return await ejs.renderFile(templatePath, { data });
};

const writeToFile = (path, content) => {
  return fs.promises.writeFile(path, content);
};

module.exports = {
  compile,
  writeToFile,
};
