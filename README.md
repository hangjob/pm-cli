## generator

> 各个功能的模板，通过 generator 可以往 package.json 注入依赖字段，或者添加文件到项目中

## bin.js

```bash
#!/usr/bin/env node 
# 这一行是必须加的，就是让系统动态的去PATH目录中查找node来执行你的脚本文件
```

#### npm link

> 命令行执行 npm link ，创建软链接至全局，这样我们就可以全局使用pm-cli命令了

## 插件介绍

### commander

> node的命令行解析最常用的就是commander库，来简化复杂cli参数操作

### mkdirp

> process.cwd()获取工作区目录，和用户传入项目名称拼接起来， （创建文件夹我们使用mkdirp包，可以避免我们一级一级的创建目录）

### inquirer

> 跟用户交互

### chalk

> chalk 包的作用是修改控制台中字符串的样式，包括： 体样式(加粗、隐藏等)，字体颜色 ，背景颜色

### ora

> 这是一个好看的加载，就是你下载的时候会有个转圈圈的那种效果，基本效果如下

```bash
const ora = require('ora')
let spinner = ora('downloading template ...')
spinner.start()
```

### download-git-repo
>拉取git项目，我们作为拉取模板