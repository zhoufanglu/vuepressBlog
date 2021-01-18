---
title: 'npm常用指令'
date: 2019-04-02 13:50:49
categories: 语言
tags: [npm]
---
#### npm （Node Package Manager）包管理工具---增删改查
#####   -S,--save 把名称放入`package.json`的`dependencies`字段内

<meta name="referrer" content="no-referrer" />



`npm gulp --save` 默认会安装最新版本。
> `package.json`文件的 `dependencices`字段:
``` javascript
 "dependencies":{
    "gulp": '^3.9.1'
 }
```


**-D,--save-dev 安装包信息将加入到`devDependencies`（开发阶段的依赖），所以开发阶段一般使用它**
>  `package.json`文件的 `devDependencices`字段:
``` javascript
"devDependencies": {
    "gulp": "^3.9.1"
}
```
##### 本地安装
``` npm
npm install gulp
```
##### 全局安装
``` npm
npm install gulp -g
```
##### 卸载模块 npm unistall
基础语法
``` npm
npm uninstall gulp
```
卸载开发版本模块
```
 npm uninstall gulp --save-dev
 npm uninstall gulp -D  *缩写*
```
##### 查看模块 npm ls
查看当前项目下模块
``` npm
  npm ls
```
查看全局模块
``` npm
 npm ls -g
```
##### 更新
``` npm
npm update [-g] gulp
```
##### npm init 在项目中创建一个package.json文件
```npm
npm init
```
## 小结
**开发的时候 `npm install name -D`就完事了**
**npm相当一个插件库，需要什么装什么，装好了use就行了，就像刚刚开始使用jquery一样,jquery就是一个库。**

以上内容部分摘自[npm常用命令](https://www.cnblogs.com/PeunZhang/p/5553574.html)