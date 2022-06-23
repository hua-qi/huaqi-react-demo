const { program } = require("commander");

const {
  changeRepoUrl,
  changePreviewUrl,
  changeReactSuffix,
  createProjectAction,
  addComponentAction,
} = require("./actions");

const createCommanders = () => {
  // 修改模板文件源地址
  program
    .command("change-repoUrl <url>")
    .description(
      "change template repository url, e.g. huaqi-react-demo change-repoUrl https://github.com/hua-qi/vite-react-ts.git"
    )
    .action(changeRepoUrl);

  // 修改项目 preview url
  program
    .command("change-previewUrl <url>")
    .description(
      "change project preview url, e.g. huaqi-react-demo change-previewUrl http://localhost:5000/"
    )
    .action(changePreviewUrl);

  // 修改模板后缀名
  program
    .command("change-suffix <suffix>")
    .description(
      "change template suffix, e.g. huaqi-react-demo change-suffix .tsx"
    )
    .action(changeReactSuffix);

  // [others...] 接收 <project> 之后的可选参数(长度可变)
  program
    .command("create <project> [others]")
    .description("clone a repository to a folder")
    .action(createProjectAction);

  program
    .command("addcpn <name>")
    .description(
      "add react component, e.g. huaqi-react-demo addcpn HelloWorld -d src/components"
    )
    .action(name => {
      addComponentAction(name, program.opts().dest || "src/components");
    });
  // 默认使用 "src/components"
  // 通过 program.dest 获取用户输入的 -d 命令以及内容
};

module.exports = createCommanders;
