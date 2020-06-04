---
title: '闭包'
--- 
[参考](https://segmentfault.com/a/1190000006875662)
## 闭包  
* 函数内部返回函数
* 闭包的作用域会一直存在，直到闭包不存在为止
* 缺点， 变量常驻内存，造成内存泄漏

## 案例1 
* 闭包会保存函数内部的变量, 变量私有化，如下面的a
```js
    function closure(a) {
        return function () {
            return ++a
        }
    }
    let fn = closure(1)
    console.log(fn()) //2
    console.log(fn()) //3
    console.log(fn()) //4
    //闭包释放
    fn = null
``` 
## 案例2
* 以下例子输出10个11
```js
  for (var i = 1; i <= 10; i++) {
    setTimeout(function () {
      console.log('1', i)
    }, 1000);
  }
```
* 通过闭包输出1,2,3...
```js
for (var i = 1; i <= 10; i++) {
    setTimeout((function () {
      console.log('1', i)
    })(), 1000);
  }
```
## 应用
1、 在vue的computed中，让计算属性可以传值 
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
computed:{
      computeVal(){
        return (val)=>{
          console.log(27,val) //这里能输出list里面name的值
           return val.toUpperCase()// 返回大写name
        }
      }
    }
```  
2、在一些回调函数中,拿element-ui的upload组件来做例子 
* 官方文档,需要实现以下要求  
![](../.vuepress/public/img/javascript/uploadbibao.png)  
```html
:before-upload="(file)=>beforeUpload(file, index)"
``` 