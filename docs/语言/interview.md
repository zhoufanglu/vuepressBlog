---
autoGroup-javascript: javascript  
title: interview
categories: 语言
date: 2020-7-08
tags: [javascript]
--- 
 
<Meta/>  
 
## 1、数据类型
* 基本数据类型,Undefined、Null、Boolean、Number、String、Symbol（es6新增，表示独一无二的值）和BigInt（es10新增）
* 引用 Object(function, Array, Date)
* 原始数据类型：直接存储在栈（stack）中，占据空间小、大小固定，属于被频繁使用数据，所以放入栈中存储。
* 引用数据类型：同时存储在栈（stack）和堆（heap）中，占据空间大、大小不固定。引用数据类型在栈中存储了指针，该指针指向堆中该实体的起始地址，
当查找该值时，会先找栈中的地址，然后找到堆中的值。 

## 2、类型判断
* typeof  判断基本类型
```js
    typeof 2 //number   
    typeof function(){} //function  
    typeof {} //Object  
```
* instanceof  判断引用类型
```js
2 instanceof Number //false
[] instanceof Array //true
```
* constructor
```js
console.log((2).constructor === Number); // true
console.log((true).constructor === Boolean); // true
console.log(('str').constructor === String); // true
console.log(([]).constructor === Array); // true
console.log((function() {}).constructor === Function); // true
console.log(({}).constructor === Object); // true
```
* Object.prototype.toString.call()  
一把梭 返回"[object String]" 

##3、undefined,undeclared,null
* undefined  
声明了，但没有赋值
```js
var a;
console.log(a)//undefined
```
* undeclared
没有声明，直接使用  
```js
console.log(a)//a is not defined
```
* null
空对象，内存中没有这个值
