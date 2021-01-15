---
layout: photo
title: hexo
date: 2019-01-07 10:15:27
categories: hexo
tags: [vue,github]
photos: ../../public/img/小丑壁纸1080.jpg
---

<meta name="referrer" content="no-referrer" />


# 1.hexo环境的搭建与启动
![github&hexo](https://github.com/zhoufanglu/markdownPhoto/blob/master/hexo/hexo&github.png?raw=true)
&nbsp;&nbsp;&nbsp;&nbsp;在我看来，这就是一个blog的一个页面框架，markdown文件-转换为html页面。
使用hexo，必须安装git,node.js.这里就不多说

&nbsp;&nbsp;&nbsp;&nbsp;这个是基于hexo搭建的，匆匆忙忙搞了两天，有点菜，要学的东西很多，之前git都是
用的图形化，搭建的时候发现git命令行一塌浮涂，要学，要学啊。。

#### hexo的安装
``` npm
      npm install -g hexo-cli
```
#### 初始化你的博客
``` npm
      hexo init blog #在你的仓库内初始化
```
#### 进入blog目录
``` javascript
    hexo new first_blog //创建第一个目录
    hexo g //生产
    hexo s //运行hexo服务
```
这些命令在后面作介绍，完成后，打开浏览器输入地址：这样本地的hexo环境已经搭建完毕啦

localhost:4000
#### 常用命令
``` yml
npm install hexo -g #安装Hexo
npm update hexo -g #升级
hexo init #初始化博客

命令简写
hexo n "我的博客" == hexo new "我的博客" #新建文章
hexo g == hexo generate #生成
hexo s == hexo server #启动服务预览
hexo d == hexo deploy #部署

hexo server #Hexo会监视文件变动并自动更新，无须重启服务器
hexo server -s #静态模式
hexo server -p 5000 #更改端口
hexo server -i 192.168.1.1 #自定义 IP
hexo clean #清除缓存，若是网页正常情况下可以忽略这条命令

```
#### _config.yml的配置
_config.yml 一个在blog目录下的，这个为博客配置
_config.yml 一个在them目录下，这个为皮肤配置
跟换皮肤可以在往上下载后放在themes目录下进行跟换

# 2.hexo和github关联
<b>这里要注意下电脑上的github账号和所提交的账号是需要是同一个。不然要进行配置</b>
#### blog目录下的_config.yml
``` yml
    #在最后加上你的Github仓库地址
    deploy:
      type: git
      repo: git@github.com:zhoufanglu/zhoufanglu.github.io.git #使用ssh
      branch: master

  #最后运行
  npm install hexo-deployer-git --save

  #上线
  hexo clean  #清除缓存
  hexo g  #构建
  hexo d  #deploy 部署
  #这里需要注意的是，仓库名格式必须为xxx.github.io 可以去github内设置
```
  <font color='red' size=4>这里需要注意的是，这里上传到Github仓库的是hexo构建后的静态文件，建议本地文件重新放入一个新的github的仓库！以防丢失！</font>
#### 访问你的github地址
zhoufanglu.github.io.git

# 3.解析自定义域名
还没有租服务器 先不写= -


