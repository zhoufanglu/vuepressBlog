---
title: '浅谈v-slot'
date: 2019-04-12 10:53:17
categories: 框架
tags: [vue]
---

<meta name="referrer" content="no-referrer" />


今天看朋友的项目中看到用了`v-slot`，表示本吊从来没用过，就突然了解了下。

**<font color="red">*此为vue2.6之前的用法</font>**

### 1、slot 组件传标签（父->子）
 **父组件**
```html
<template>
    <div class='father'>
        <!--子组件-->
        <child>
            <div class="item" slot='slot1'>父组件内容1</div>
            <div class="item" slot='slot2'>父组件内容2</div>
            <div class="item" slot='slot3'>父组件内容3</div>
        </child>
    </div>
</template>
```
`slot='slot1'`，`slot1`相当于id，子组件会根据这个来找到父组件的元素来进行匹配
**子组件**
```html
<template>
    <div class='child'>
        <!--slot-->
        <slot name = 'slot1'></slot>
        <slot name = 'slot2'></slot>
        <slot name = 'slot3'></slot>
    </div>
</template>
```
* **总结:**
这个是父组件把自己内的元素传给子组件，样式只能由子组件内的css来修改。
个人改进很鸡肋，为什么不直接在子组件内写呢？

***

### 2、v-slot 组件传标签（父->子）
**<font color="red">*此为vue2.6之后的用法</font>**
* 此版本舍弃了 `slot` 和 `slot-scope`

**父组件**
```html
<div class='father'>
    <template v-slot:footer>
        <!--传标签给子组件-->
        <div>我是父元素的标签div</div>
    </template>
</div>
```

**子组件**
```html
<div class='child'>
    <template name="footer">

    </template>
</div>
```
* **总结**
道理同上，但是template必需得写

***

### 3、v-slot 标签传值(子->父)
**父组件**
```html
<div class='father'>
    <template v-slot:footer='slotPorps'>
        <div>{{slotPorps.footer}}</div> <!--输出'我是子组件的参数'-->
    </template>
</div>
```

**子组件**
```html
<div class='child'>
    <template name="footer" footer='我是子组件的参数'>

    </template>
</div>
```
**总结**
* 子组件定义name，父组件使用v-slot:name来打通父子组件。
* 父组件必需写上`template`标签，格式为`v-slot:name="slotProps"`。
* 子组件必需写上 `name`,相当于一个标记,一个ID。
* 父组件向子组件传标签，子组件向父组件传值。