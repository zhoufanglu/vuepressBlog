---
title: '闭包'
--- 
[参考](https://segmentfault.com/a/1190000006875662)
## 闭包  
* 函数内部返回函数
* 闭包的作用域会一直存在，直到闭包不存在为止

## 案例1
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