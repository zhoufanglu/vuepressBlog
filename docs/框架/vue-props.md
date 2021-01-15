---
autoGroup-vue: vue  
title: 组件之props
categories: 框架
date: 2020-08-25
tags: [vue]
--- 
 
<Meta/>  
 
## 基本用法  
```js
props: ['params1', 'params2']
```  
## 详细用法
```json
"refAge": {
    type: Number,
    default: 0
},
"refName": {
    type: String,
    default: ''
},
"hotDataLoading": {
    type: Boolean,
    default: false
},
"hotData": {
    type: Array,
    default: () => {
    return []
}
},
"getParams": {
    type: Function,
    default: () => () => {}
},
"meta": {
    type: Object,
    default: () => ({})
}
"props": {
  title: String,
  likes: Number,
  isPublished: Boolean,
  commentIds: Array,
  author: Object,
  callback: Function,
  contactsPromise: Promise // or any other constructor
}
```