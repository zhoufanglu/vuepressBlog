---
autoGroup-javascript: javascript  
title: array方法
date: 2020-06-01
categories: 语言
tags: [javascript]
---
 
<Meta/>  
 
## 以下为Array的方法
![](https://user-gold-cdn.xitu.io/2019/11/13/16e6439e5e5b6860?w=304&h=609&f=png&s=47911)

## Array.filter
**作用**：遍历数组,过滤数组内的元素。返回条件之外的元素。

* 删除数组`arr`中`name`为`'lfz'`的对象 

```js
const arr = [{name: 'lfz'}, {name: 'sxy'}, {name: 'xxx'}];
            const newArr = arr.filter((val) => {
                return val.name !== 'lfz';
            });
            console.log(48, newArr);
            
```

## Array.find
**作用**：遍历数组,找到组内的元素。 找到返回这个元素，若没有，返回`undefind`
```js
const arr = [{name: 'lfz'}, {name: 'sxy'}, {name: 'xxx'}];
            const flag = arr.find((val) => {
                return val.name === 'lfz22';
            });
            console.log(48, flag);//undefind
```
```js
const arr = [{name: 'lfz'}, {name: 'sxy'}, {name: 'xxx'}];
            const flag = arr.find((val) => {
                return val.name === 'lfz';
            });
            console.log(48, flag);//{name: 'lfz'}
```

**总结下filter和find的区别**
* 这两者有点相似，都是找出数组中相匹配的元素。
* `filter`找出多个匹配的元素，返回数组。
* `find`找出一个匹配的元素，返回对象（遇到第一个匹配的就返回）。
---

## Array.findIndex
* 用法与`Array.find`类似。`findIndex`就是返回索引,没找到返回-1
```js
//findIndex
    const objList = [
        {name:'a', age: 1},
        {name:'b', age: 2},
        {name:'c', age: 3},
    ]
    const curIndex  = objList.findIndex(i=>{
        return i.age === 3
    })
    console.log(curIndex)//2  若没有找到返回-1
```

## Array.from()
1、类似扩展运算符用法
```js
Array.form('foo') //['f','o','o']
[...'foo'] // ['f','o','o']
```
2、处理数组每项的参数
```js
const arr = [{name:'lfz',age:24},{name:'sxy',age:23}]
        const endArr = Array.from(arr, item =>{
          return {name: item.name, age: item.age+1}
        })
        console.log(43,endArr) //[{name:'lfz',age:25},{name:'sxy',age:24}]
```
> `map`也能实现,`forEach`用法相同。

```js
  const arr = [{name:'lfz',age:24},{name:'sxy',age:23}]
  arr.map((item,index)=>{
          item.age = ++item.age
        })
        
  console.log(47, arr)
``` 
3、1=>[0,1], 2=>[0,1,2]
```js
Array.from({length:10},(_,i)=>i)
```

## map&forEach用法
**区别：**
* `map`有返回值，`forEach`没有。
* `map`速度小于`forEach`。
* `map`不会改变原来的数组，而`forEach`会改变。

**场景：**
需要改变数组的值的时候，使用`map`,反之使用`forEach`。


**map**
```js
        const arr = [{name:'lfz',age:24},{name:'sxy',age:23}]
        const endArr = arr.map((item,index)=>{
          return ++item.age
        })
    console.log(endArr)//[25, 24]
```
---
**forEach** 

* 无法跳出循环，使用`some()`/`every()` 
```js
        const arr = [{name:'lfz',age:24},{name:'sxy',age:23}]
        const endArr = arr.forEach((item,index)=>{
          return ++item.age
        })
    console.log(endArr)//undefind
```

## sort
* 排序字符串的时候是用Ascii码来比较的。所以字符串不能使用`+`,`-`操作来返回。

**按照`name`升序排序**
```js
const arr = [
          {name:'c',age:24},
          {name:'b',age:23},
          {name:'a',age:25},
          {name:'d',age:25},
          ]
        arr.sort(sortByAge)

        function sortByAge(a, b) {
            //return a.age-b.age
            if(a.name>b.name){
                return 1
            }else if(a.name<b.name){
                return -1
            }
        }

        console.log(46, arr)
```
结果:
![](https://user-gold-cdn.xitu.io/2019/11/18/16e7ca2307333fae?w=301&h=136&f=png&s=8344)

## some&every
* some()当内部return true时跳出整个循环， return false 会继续执行
* some()如果不return 会遍历数组，返回false

1、案例a
```js
var arr = [1,2,3,4,5];
var num = 3;
arr.some(function(v){
   if(v == num) {
       return true;
   }
   console.log(v);
});
//1
//2
//true
```
2、案例b
```js
const arr = [1,2,3,4]
            const res = arr.some((i,index)=>{
                console.log(i)
            })
            console.log(40, res) //false
```
---

* every()当内部return false时跳出整个循环, return true会继续执行(与every相反)
* every()当内部不return， 只会执行一次就跳出，返回false
 
1、案例a 

```js
var arr = [1,2,3,4,5];
var num = 3;
arr.every(function(v){
   if(v == num) {
       return false;
   }else{
       console.log(v);
       return true;
   }
});
//1
//2
//false
``` 

2、案例b,不return false，只会执行一次, 返回false
```js
const arr = [1,2,3,4]
            const res = arr.some((i,index)=>{
                console.log(i)
            })
            console.log(res) 
            // 1
            //false
```
[摘自](https://blog.csdn.net/lihefei_coder/article/details/76736296)

**以下内容摘自小红书**  

* `every`与`some` 都用于查询数组中的项是否满足某个条件  
* `every`传入的函数必须对每一项都返回`true`，这个方法才返回`true`,否则就返回`false`
* `some` 传入的函数的某一项返回`false`, 这个方法返回`true`。



## Array.fill(val,start,end) 填充
* 面试题，生成长度为100的数组，且值为1
```js
let arr = new Array(100)
arr.fill(1)
```
## Array.slice(start, end) 分割 
* slice(start, end),包括`start`,不包括`end`
* 不会改变原来数组
```js
    [1,2,3].slice(1)//[2,3] 
    [1,2,3].slice(1,2) // [2]
```

## Array.reduce(prev, cur, index, arr) 从数组第二项开始遍历
* `prev`当前遍历项的前一个元素
* `cur`当前项 

```js
arr.reduce((prev,cur,index,arr)=>{
  console.log(index, prev,cur)
  return prev+cur
})
//输出
//index prev cur
//1       1   2
//2       3   3
//3       6   4
//4       10  5  
```  

* 引入modules下的文件
```js
const modules = modulesFiles.keys().reduce((modules, modulePath) => {
  // 忽略第1个js
  const moduleName = modulePath.replace(/^\.\/(.*)\.\w+$/, '$1')
  // 执行modulesFiles函数，返回一个对象{default: {// 文件内容}, _esModule: true}
  const value = modulesFiles(modulePath)
  modules[moduleName] = value.default
  return modules
}, {})
```