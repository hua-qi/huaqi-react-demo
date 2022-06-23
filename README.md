# huaqi-react-demo

快速搭建和开发 react-web 项目的 CLI

支持跨平台（windows、MacOS、Linux）

跨包管理工具（yarn、npm）

支持自定义 react-web 项目模板

## 目录

- [huaqi-react-demo](#huaqi-react-demo)
  - [目录](#目录)
  - [项目结构](#项目结构)

## 项目结构

- index.js 入口文件
- lib 库
  - config - 配置库
    - repo-config - 模板相关配置
  - core - 核心库
    - help - 帮助和可选信息
    - create - 创建其他指令
    - actions - clone 模板流程化
  - utils - 工具库
    - changeConfig - 修改模板配置公共函数
    - template-compile - 编译模板文件相关
    - terminal - 执行终端命令相关
- package.json
- package-lock.json
- readme.md

