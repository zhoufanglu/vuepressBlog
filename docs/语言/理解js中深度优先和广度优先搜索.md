---
autoGroup-javascript: javascript  
title: 理解js中深度优先和广度优先搜索
date: 2021-10-19
categories: 语言
tags: [javascript]
---
 
<Meta/>

## 数据结构
```js
const data = [{
  name: 'a',
  children: [
    {
      name: 'a1',
      children: [
        { name: 'a11' },
        { name: 'a12' },
      ]
    },
    { name: 'a2' },
    { name: 'a3' },
  ],
},
  {
    name: 'b',
    children: [
      { name: 'b1' },
      { name: 'b2' },
      { name: 'b3' }
    ],
  }
]
```
### 图形化数据

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1c4498d8768e43eeb392c9f6ae565598~tplv-k3u1fbpfcp-watermark.image?)

## 1、深度优先搜索 - depthFirstSearch
* 就是按照节点一级一级往下找，然后返回节点继续搜索
### 查找顺序
![深度优先顺序](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/478a1f3162894259810ec3bc163f9b53~tplv-k3u1fbpfcp-watermark.image?)
### 代码
```js
//递归, 往下找到一个节点，就放入res，子节点也是如此
const data = [...]
function depthFirstSearch(data, res = []) {
  data.forEach(i=>{
    res.push(i.name)
    if(i.hasOwnProperty('children')){ //如果有子元素，继续进行查找
      depthFirstSearch(i.children, res)
    }
  })
  return res
}
console.log('深度优先遍历顺序', depthFirstSearch(data))
//深度优先遍历顺序 (10) ['a', 'a1', 'a11', 'a12', 'a2', 'a3', 'b', 'b1', 'b2', 'b3']
```

##  2、广度优先搜索 - breadthFirstSearch
* 利用队列的特性，把每一层存入队列，先进先出
### 查找顺序
![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5e474605721446ac9c5fc9a009263ddf~tplv-k3u1fbpfcp-watermark.image?)
### 代码
```js
// 创建一个执行队列, 当队列为空的时候则结束
function breadthFirstSearch(data) {
  let queue = []//模拟一个队列, 先进先出
  let res = [] // 存放顺序集-结果
  queue = JSON.parse(JSON.stringify(data)) // 赋值深拷贝一下
  while (queue.length > 0) {
    let item = queue.shift()//取出队列的第一项给item, 删除队列内的第一项
    res.push(item.name) //值存入顺序
    if (item.hasOwnProperty('children')) { //如果有子节点，再次存入队列
      queue.push(...item.children)
    }
  }
  return res
}
console.log('广度优先',breadthFirstSearch(data))
//广度优先 (10) ['a', 'b', 'a1', 'a2', 'a3', 'b1', 'b2', 'b3', 'a11', 'a12']
```
### 代码解析
>* 第一次，`队列 = [a, b]`
>* 第二次，把`a`放入结果集, `结果集 = [a]`, `队列 = [b]`, 发现`a`有子节点, 存入队列，` 队列 = [b, a1, a2, a3]`
>* 第三次，把`b`放入结果集， `结果集 = [a, b]`, `队列 = [a1, a2, a3]`, 发现`b`有子节点，存入队列,` 队列 = [a1, a2, a3, b1, b2,b3]`
>* 以此类推。。 我们发现是先进先出的，所以是队列。

## 使用场景
-   如果树很深，使用广度优先搜索。
-   如果树很宽，使用深度优先搜索。

