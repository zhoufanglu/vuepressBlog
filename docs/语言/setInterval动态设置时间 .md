---
autoGroup-javascript: javascript  
title: setInterval动态设置时间
categories: javascript
tags: javascript
date: 2021-4-8 14:16:14
--- 

<Meta/>  

## 需求（动态时间设置）
> 需要启动个定时器， 2s, 2s, 5s(或者不同时间) 的顺序执行一次。

### 解决方法1
* 利用`setInterval`, 调用一次，清除一次

```js
  let count = 0, timeList = [2000, 2000, 5000]

  let interval = setInterval(fn, timeList[0])

  function fn() {
    count++
    let index = count%3

    console.log('次数:'+count,'时间:'+getTime())
    if(index===0){
      console.log('--------------')
    }

    clearInterval(interval)
    interval = setInterval(fn, timeList[index])
  }
  //获取当前秒数
  function getTime() {
    let myDate = new Date();
    return myDate.getSeconds();// 获取当前秒数(0-59)
  }
```
* 结果
  ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/348290fbe11c4f5980a6434b0c71aba2~tplv-k3u1fbpfcp-watermark.image)


### 解决方法2
* 递归使用`setTimeout`
```js
  let count = 0, timeList = [2000, 2000, 5000]

  loopTime()

  function loopTime() {
    count++
    let index = count % 3

    console.log('次数:'+count,'时间:'+getTime())
    if(index===0){
      console.log('--------------')
    }

    setTimeout(_ => {
      loopTime()
    }, timeList[index])
  }

  function getTime() {
    let myDate = new Date();
    return myDate.getSeconds();// 获取当前秒数(0-59)
  }
```
---
## setInterval遇到的问题
> 例如，我们需要每秒输出` 1 0 0 1 0 0 1 `这样的数据

### 实践1
> 我第一次想到的是，类似两层`for`循环那样输出
> 所以，就利用`setInterval`内嵌套一层`setInterval`

```js
  let firstCount = 0, secondCount = 0
  let interval_1 = null, interval_2 = null

  interval_1 = setInterval(_ => {
    firstCount++
    console.log(`第一层定时器---------------执行次数${firstCount}-----`)
    secondInterval()
  }, 3000)

  function secondInterval() {
    interval_2 = setInterval(_=>{
      secondCount++
      console.log(`第二层定时器-执行次数${secondCount}`)
    }, 1000)
  }
```
* 结果

![image.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/878ef2a3d1e64425b9b18179da8b607b~tplv-k3u1fbpfcp-watermark.image)
> 发现了什么，第二个定时器，每次都会多三次  
> 第一个定时器每轮循一次， 第二个定时器都会新增一个  
> 所以在每次启动前清除第二个定时器就可以
---
>**优化**-清除第二个定时器
```js
  interval_1 = setInterval(_ => {
    clearInterval(interval_2) //新增清除
    firstCount++
    console.log(`第一层定时器---------------执行次数${firstCount}`)
    secondInterval()
  }, 3000)
```
* 结果

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5c42d3335bdd49799a2258b8d77997ef~tplv-k3u1fbpfcp-watermark.image)

### 实践2
> 上面的方法是一个队列里面嵌套了一个队列, 每次还要`clear`  
> 其实我们可以直接创建两个队列，直接得到结果
* 代码

```js
    //第一个定时器
  setInterval(_=>{
    console.log('1')
  }, 2000)
    //第二个定时器
  setInterval(_=>{
      console.log('0')
  }, 1000)
```
以上代码可以实现输出`0,1,0,0,1,0,0,1`的效果,但是没有每秒执行。

**分析以上代码输出队列**
|  秒数执行   | 第一个定时器结果  | 第二个定时器结果 | 实际需要的结果|
|  ----  | ----  | ---- | ---- |
| 1秒  | - | 0 | 1 |
| 2秒  | 1 | 0 | 0 |
| 3秒  | - | 0 | 0 |
| 4秒  | 1 | 0 | 1 |
| 5秒  | - | 0 | 0 |
| 6秒  | 1 | 0 | 0 |
| 7秒  | - | 0 | 1 |
| 8秒  | 1 | 0 | 0 |
| 9秒  | - | 0 | 0 |
| 10秒 | 1 | 0 | 1 |
> 分析上面队列（第三列），其实我们计算下，只要是(秒数-1)%3 === 0的地方输出1就行，其它输出1
* 代码改进
```js
  let count = 0
  setInterval(_=>{
    count++
    if((count-1) % 3 === 0){
      console.log(1)
    }else{
      console.log(0)
    }
  }, 1000)
```
