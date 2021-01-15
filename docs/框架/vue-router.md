---
autoGroup-vue: vue  
title: 路由模式
categories: 框架
tags: [vue]
--- 
 
<Meta/>  
 
[参考](https://juejin.im/post/5ceedf8ff265da1b80202841)  
[官方文档](https://router.vuejs.org/zh/guide/essentials/history-mode.html)  

## hash
* `url`带有`#`号
* `url`与页面是有关联的，可以利用`onhashchange `监听`url`变化

## history
* 说说html5的history方法吧

### pushState(state object, title, page)  
* 一个状态对象, 一个标题 (FireFox目前被忽略), 和 (可选的) 一个URL
* 不会触发hashchange事件
* 新建了历史记录
1、假设有两个页面`foo.html`,`bar.html`
在`foo.html`中执行以下Js
```js
var stateObj = { value: "111" };
history.pushState(stateObj, "bar", "bar.html")
```  
代码执行完毕之后，我们可以发现`url`进行了跳转，但是内容没有变化，刷新之后又可以见了。  

### replaceState()
* 效果与上面一样，但是是修改了当前页面的历史记录。而不是新建一个。


## vue路由的实现原理
[参考](https://juejin.im/post/5c52da9ee51d45221f242804)
* hash 通过hashChange监听url的变化，来改变页面的内容
* history 是通过history.pushState来进行跳转和记录内容，通过监听popstate事件进行改变页面的内容
