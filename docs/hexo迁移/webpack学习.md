---
title: 'webpack基础学习'
date: 2019-01-22 13:49:59
tags: [webpack]
categories: webpack
---

<meta name="referrer" content="no-referrer" />


今天看了同事配置的package.json 看了之后一头雾水，所以来学习一下webpack。
# webpack4.X入门配置
1.安装webpack```npm install webpack webpack-cli webpack-dev-server -g ```-g是全局安装。

2.输入命令``` mkdir config dist src ```创建这三个文件夹，手动也可以。

![](https://github.com/zhoufanglu/markdownPhoto/blob/master/webpack/%E6%96%87%E4%BB%B6.png?raw=true)

3.输入命令 ``` npm init -y``` ,-y表示yes，都同意。
然后生成了package.json文件。

4.在dist目录下创建index.html,src目录下创建index.js文件。
项目目录结构如下：
![](https://github.com/zhoufanglu/markdownPhoto/blob/master/webpack/%E7%9B%AE%E5%BD%95.png?raw=true)

5.webpack中打包默认找的是```src/index```为入口，然后在终端中输入```webpack```,进行简单打包。
打包后多了个main.js
![打包后目录](https://github.com/zhoufanglu/markdownPhoto/blob/master/webpack/%E6%89%93%E5%8C%85-%E7%9B%AE%E5%BD%95.png?raw=true)
但是出现的警告:告知我们mode没有设置
![警告](https://github.com/zhoufanglu/markdownPhoto/blob/master/webpack/%E6%89%93%E5%8C%85%E8%AD%A6%E5%91%8A.png?raw=true)

mode是webpack中独有的，有两种打包环境，一个是开发环境：development另外一个是生产环境：production
打包的时候输入
``` webpack --mode=development ```  开发环境, ``` webpack --mode=production ```   生产环境
就不会出现警告提示了

``` webpack --mode=development ``` 体积大
![dev](https://github.com/zhoufanglu/markdownPhoto/blob/master/webpack/dev.png?raw=true)

``` webpack --mode=production ``` 体积小
![pro](https://github.com/zhoufanglu/markdownPhoto/blob/master/webpack/pro.png?raw=true)

最后出现了node_modules这个文件夹
![node_modules](https://github.com/zhoufanglu/markdownPhoto/blob/master/webpack/node_modules.png?raw=true)


6.在config目录下创建```webpack.dev.js```。这个是webpack的配置文件。


7.输入命令```rm dist/main.js src/index.js```移除掉这两个文件我们自己来配置

7.1 在src目录下创建main.js

 >7.2 在 ```webpack.dev.js``` 内配置，写入
 ![webpack.dev.js](https://github.com/zhoufanglu/markdownPhoto/blob/master/webpack/main%E9%85%8D%E7%BD%AE.png?raw=true)

 >7.3 现在执行``` webpack --mode="development" ``` 会报错，因为```src/index.html```入口已经被删除












