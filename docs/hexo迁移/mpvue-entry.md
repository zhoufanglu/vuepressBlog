---
title: 'mpvue-entry'
date: 2019-07-30 17:24:01
categories: javascript
tags: [vue,小程序]
---

<meta name="referrer" content="no-referrer" />

## 背景
项目做完了,感觉反应有点慢，无意中看到了分包。打算对项目进行分包。

**版本**
        `mpvue:2.0`
        `mpvue-entry: "^2.0.0-rc.9"`

## 微信小程序分包
 微信小程序上线有限制
 *  整个小程序所有分包大小不超过 8M
 * 单个分包/主包大小不能超过 2M

所以进行分包，分包好处

    1、首次启动时，先下载小程序主包，显示主包内的页面

    2、如果用户进入了某个分包的页面，再下载这个对应分包，下载完毕后，显示分包的页面。


## 插件`mpvue-entry`
github地址--[mpvue-entry](https://github.com/F-loat/mpvue-entry#%E5%8F%82%E6%95%B0)
目的是把每个`page`页面下的`main.js` 抽离出来
![](https://user-gold-cdn.xitu.io/2019/7/25/16c287162e1bdae2?w=917&h=518&f=png&s=115230)


### a、新项目
如果你还没有新建项目，可以利用`vue init F-loat/mpvue-quickstart my-project` 初始化一个项目。
```node
vue init F-loat/mpvue-quickstart my-project  //新建项目
```
### b、已新建好mpvue项目

直接修改webpack(a方案也要修改webpack)
具体如何修改： 参考[mpvue-entry](https://github.com/F-loat/mpvue-entry#%E5%8F%82%E6%95%B0)

<font color="red">**注意点：**</font>
1. 原本mpvue建的项目，pages目录页面下会有`main.js`&`main.json`&`xxx.vue`三个文件，使用`mpvue-entry`后，就不需要`main.js`和`main.json`文件（可删除）。
![图片](https://user-gold-cdn.xitu.io/2019/7/25/16c2869f97105ecc?w=441&h=107&f=png&s=5930)

2. 在`main.js`中把不是公用的代码用`app-only`注释掉,把不是每个`page`页面需要用到的代码给注释掉。
![](https://user-gold-cdn.xitu.io/2019/7/25/16c286a8523204ef?w=738&h=307&f=png&s=24943)

3. 在`main.js`中定义Vue对象的时候要注入App对象。
![](https://user-gold-cdn.xitu.io/2019/7/25/16c286e0e13261cf?w=950&h=570&f=png&s=55442)

### 最后附上 `app.json` 和目录
`app.json`
![](https://user-gold-cdn.xitu.io/2019/7/25/16c286ea2725c739?w=518&h=313&f=png&s=19364)

目录

![](https://user-gold-cdn.xitu.io/2019/7/25/16c28700bb2b5e29?w=268&h=319&f=png&s=12919)

