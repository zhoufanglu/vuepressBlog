---
title: '小程序框架mpvue中的坑'
date: 2019-07-12 16:29:37
categories: javascript
tags: [mpvue, vant]
---

<meta name="referrer" content="no-referrer" />


## 背景
&nbsp;&nbsp;&nbsp;&nbsp;由于公司要用刚小程序开发个旧项目。历时一个月，来说说遇到的坑吧。

<b>用到的技术</b>
*  mpvue
*  vant(weapp)

###  1、关于ui框架`weapp`的引入
&nbsp;&nbsp;&nbsp;&nbsp; <font>不是传统的npm模块的安装引入，安装后需要下载静态文件，</font>再从`app.json`中引入，
看官网链接[官网教程]('https://youzan.github.io/vant-weapp/#/quickstart')。

### 2、app.json
* 这相当于微信的配置文件，里面可设置增加页面，插件(例如weapp组件的引入)，增加了页面后，每次都要`npm run dev`，不然不生效。

### 3、mpvue,没有路由这个概念。
* 若要使用，请装`mpvue-router-patch`，这个插件。
* `router.push({ path: '/pages/news/list', reLaunch: true })`,只能跳转7次(或者5次，具体忘了)，可改用`$router.replace`(但此项不支持微信原生的tab的跳转。)

### 4、v-html 无效
* `html`内想解析`'<p>213</p>'`字符串标签,用`v-html`，无效。
* 解决方法：利用`mpvue-wxparse`这个插件。

### 5、dom问题
* 小程序内没有dom的概念，所有使用到dom的插件都报错。`querySelector`,`$refs`这些都不可以。。

### 6、父子组件传值问题
* 父->子，props传值，子组件的`html`内渲染时能拿到这个值。
* 在`onShow()`,`mounted()`方法内是拿不到的，在`methods`的方法内可以拿到。（生命周期问题）
* 解决方法：`vuex`,`watch`这个参数。

### 7、textarea问题
* 这个是真的操了蛋，`textarea`内设置了`placeholder`属性，这个层级是最高的，有弹窗的话，会覆盖这个弹窗。如下图，`z-index`怎么设置都是无效的。
![图片](https://user-gold-cdn.xitu.io/2019/7/12/16be5430e937487f?w=558&h=345&f=png&s=34412)


* 解决方法：弹窗打开时隐藏这个`textarea`,关闭时显示这个`textarea`。

### 8、wx.chooseImage
* 如果是多图片上传，数组操作用`.push()`无法展现。
* 用`array.concat()`解决。

### 9、图片懒加载
* `vue-lazyload` 这货不支持。
* `mpvue-img-load`用着个。


***

**我也刚刚入手，如有问题，欢迎指出。**