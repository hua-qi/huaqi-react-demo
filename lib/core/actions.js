const { promisify } = require("util");
const path = require("path");
const fs = require("fs");

// 由于 download-git-repo 使用回调机制，在此进行 promify 操作，转变为 promise
const download = promisify(require("download-git-repo"));
const open = require("open");

const { reactRepo, repoPreviewUrl, reactSuffix } = require("../config");
const {
  commandSpawn,
  compile,
  writeToFile,
  changeConfig,
} = require("../utils");

// 修改模板文件源地址
const changeRepoUrl = url => {
  const newReactRepo = `direct:${url}`;
  changeConfig(reactRepo, newReactRepo);
  console.log(`current reatRepo is: ${newReactRepo}`);
};

// 修改项目 preview url
const changePreviewUrl = url => {
  changeConfig(repoPreviewUrl, url);
  console.log(`current project preview url is: ${url}`);
};

// 修改模板后缀名
const changeReactSuffix = suffix => {
  changeConfig(reactSuffix, suffix);
  console.log(`current project template suffix is: ${suffix}`);
};

// 创建项目相关 action
const createProjectAction = async project => {
  console.log("Waiting for creating the project~");
  // 1. clone 项目
  // project 对应模板下载本地路径
  // clone: true 表示执行 git clone
  await download(reactRepo, project, { clone: true });

  // 2. 根据当前模板所使用的包管理工具 npm / yarn，选择不同的命令
  const yarnLockPath = path.resolve(process.cwd(), project, "yarn.lock");
  const isYarnExist = fs.existsSync(yarnLockPath);
  const manager = isYarnExist ? "yarn" : "npm";

  // 平台判断 仅在当前运行环境为 Windows 时，才使用 shell
  const isWin = process.platform === "win32";

  // 3. 下载模板依赖
  await commandSpawn(manager, ["install"], {
    cwd: `./${project}`,
    shell: isWin,
  });

  // 4. run build 命令（由于所使用模板，需要进行一次 build 才能进行预览）
  await commandSpawn(manager, ["run", "build"], {
    cwd: `./${project}`,
    shell: isWin,
  });

  // 5. run serve 命令
  // 如果使用 await 关键字，该进程执行完毕会处于阻塞状态
  // 故而使用异步操作，开启浏览器等待后续项目热更新
  commandSpawn(manager, ["run", "serve"], {
    cwd: `./${project}`,
    shell: isWin,
  });

  // 5. 打开浏览器
  open(repoPreviewUrl);
};

// 添加组件相关 action
const addComponentAction = async (name, dest) => {
  const data = {
    name,
    lowerName: name.toLowerCase(),
  };

  // 1. 编译 ejs 模板
  const cpnFileContent = await compile("component.tsx.ejs", data);

  console.log(dest);
  // 2. 生成文件并写入内容
  const cpnFilePath = path.resolve(dest, `${name}${reactSuffix}`);
  writeToFile(cpnFilePath, cpnFileContent);
  console.log("Successfully Added");
};

module.exports = {
  changeRepoUrl,
  changePreviewUrl,
  changeReactSuffix,
  createProjectAction,
  addComponentAction,
};
