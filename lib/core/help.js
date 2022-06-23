const { program, Option } = require("commander");

const { reactRepo, repoPreviewUrl, reactSuffix } = require("../config");

const helpOptions = () => {
  program.on("--help", () => {
    console.log(`
Other:
    other options...
    `);
  });

  // 设置自定义 options
  // <dest> 使用变量名 dest 接收参数
  program
    .option(
      "-d, --dest <dest>",
      "a destination folder, e.g. huaqi-react-demo -d /src/components"
    )
    .option(
      "-r, --repoUrl",
      "View the current repository url, e.g. huaqi-react-demo -r",
      reactRepo
    )
    .option(
      "-p, --previewUrl",
      "View the current project preview url, e.g. huaqi-react-demo -p",
      repoPreviewUrl
    )
    .option(
      "-s, --suffix",
      "View the current templates's suffix, e.g. huaqi-react-demo -s",
      reactSuffix
    );
};

module.exports = helpOptions;
