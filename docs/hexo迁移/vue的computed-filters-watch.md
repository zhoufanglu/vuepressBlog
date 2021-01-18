---
title: 'vue的computed,filters,watch'
categories: 框架
tags: [vue]
date: 2019-11-04 18:39:13
---

<meta name="referrer" content="no-referrer" /> 

* tip:这三者有点相像，之前工作中基本没有使用过`filters`，最近面试经常被问到`filters`的使用方法。
* 之前有过初始化一个数据的需求，发现`computed`实现不了，最后查阅资料，通过`computed`闭包传参实现了。其实完全可以用`filters`实现！！！

## 1、computed
* `this`指向的是`Vue`对象  
* 一般不能传值（需要传值可以利用闭包解决）  
* 一般有返回值
* 使用场景(购物车的总价可以使用)
下面举个闭包传值用法的例子

```html
<ul>
  <li 
    v-for="(i,index) in list" 
    :key="index">
        {{computeVal(i.name)}}
  </li>
</ul>
```
```js
export default {
    data() {
          return {
            list:[
              {name:'lfz'},
              {name:'sxy'},
              {name:'ljd'},
              {name:'xjy'},
            ]
          }
        },
        computed:{
          computeVal(){
            return (val)=>{
              console.log(27,val) //这里能输出list里面name的值
               return val.toUpperCase()// 返回大写name
            }
          }
        },
}
```
**这个做法可以初始化数据，其实可以被`filters`代替**


## 2、filters
* `this`无法访问`vue`实例。
* 使用场景,数据格式化，例如时间的初始化等...

参考文献--[官方链接](https://cn.vuejs.org/v2/guide/filters.html)

```html
<ul>
     <li v-for="(i,index) in list" :key="index">{{ i.name | filtersName }}</li>
</ul>
```
 
```js
export default {
    name: "test_2",
    data() {
      return {
        list:[
          {name:'lfz'},
          {name:'sxy'},
          {name:'ljd'},
          {name:'xjy'},
        ]
      }
    },
    filters:{
      filtersName(name){
        return name.toUpperCase()
      }
    },
}
```

## 3、watch
* 监听一个`data`内定义的对象。