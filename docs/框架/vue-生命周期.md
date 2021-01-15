---
autoGroup-vue: vue
title: 生命周期
categories: 框架
date: 2020-09-25
tags: [vue]
---
 
<Meta/>  
 
## 父子组件生命周期
```html
<div class="father">
    <children name="child"></children>
</div>
```
结果  
1、父组件`created`  
2、子组件`created`  
3、子组件`mounted`  
4、父组件`mounted`