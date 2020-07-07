---
title: 'hexo-helper-live2d(左下角二次元的实现)'
date: 2019-04-29 15:01:57
categories: hexo
tags: [hexo]
---

<meta name="referrer" content="no-referrer" />


## 1、hexo-helper-live2d
> 今天逛掘金的时候，偶然看到右下角这个二次元，怎么会有那么**的东西。
![live2d](https://github.com/zhoufanglu/markdownPhoto/blob/master/hexo/lived.gif?raw=true)
欢迎左下角试玩，鼠标点击还出发出声音，10分钟的时候会站起来跳舞=.=

## 2、使用教程
### 先要有个基于hexo的博客。
hexo的搭建方法 [hexo](https://zhoufanglu.github.io/2019/01/07/hexo+github/)

### 在hexo博客中的应用
在这里先放上github项目的链接。[hexo-helper-live2d](https://github.com/EYHN/hexo-helper-live2d/blob/master/README.zh-CN.md)

在博客内运行，`npm install --save hexo-helper-live2d` 安装好就直接能用了，非常方便。

### 大小，位置等配置。
在`_config.yml`文件里面加上配置参数。

* 配置如下

``` js
live2d:
  model:
    scale: 1
    hHeadPos: 0.5
    vHeadPos: 0.618
  display:
    superSample: 2
    width: 250
    height: 500
    position: left
    hOffset: 0
    vOffset: -20
  mobile:
    show: true
    scale: 0.5
  react:
    opacityDefault: 0.7
    opacityOnHover: 0.2
```