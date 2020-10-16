---
autoGroup-javascript: javascript  
title: proxy
--- 
 
<Meta/>  
 
# proxy
* vue2用的
* 之前写过一篇[Object.defineProperty](https://juejin.im/post/6844904104649555976)

## 语法
`new Proxy(target, handler)` 

以下摘自[MDN](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 
* target 要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）。
* 一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

## 1、handler
* 个人理解就是对某个对象的拦截器
* 可以在对象改变的时候监听，进行操作 
---
记录些常用的`handler`里面的函数
### 1、1 拦截读取 get()
```js
    /**
     * @param target 目标对象
     * @param prop 属性
     * @param receiver Proxy或者继承Proxy的对象
     */
const handler = {
    get: function (target, prop, receiver) {
      console.log(prop)
      if(target.hasOwnProperty(prop)){
        return target[prop]
      }else{
       console.log('没有找到属性', prop)
      }
    },
}

const p = new Proxy({name:'tog'}, handler)
//我们访问下p.name
p.name //会触发handler内的get方法
```

### 1、2 拦截操作 set()
```js
const handler = {
   /**
     * @param target 目标对象
     * @param prop 属性
     * @param value 改变后的值
     * @param receiver Proxy或者继承Proxy的对象
     */
    set: function (target, prop, value, receiver){
      console.log('set',target)
      console.log('set',prop)
      console.log('set',value)
      target[prop] = value
    },
}

const p = new Proxy({name:'tog'}, handler)
//为p添加age属性
p.age = 18 //会触发handler内的set方法
```

### 1、3 删除操作deleteProperty()
```js
const handler = {
   /**
     * @param target 目标对象
     * @param prop 属性
     */
    deleteProperty:function (target, prop) {
      delete target[prop]
      console.log('我做了删除操作', prop)
      return true
    },
}

const p = new Proxy({name:'tog'}, handler)
//为p删除name属性
delete p.name //会触发handler内的deleteProperty方法
```

## 2、简单的双向绑定
* html
```html
<input type="text" id="input" oninput="change(this)">
<br/>
<div id="show"></div>
```

* script
```js
<script>
  function proxy_bind(target){
    return new Proxy(target, {
      set(target, prop, value){
        console.log('set--->', prop)
        target[prop] = value
        document.querySelector('#show').textContent = value
        return value
      },
      get(target, prop){
        console.log('get--->')
        return target[prop]
      }
    })
  }
  let inputObj = {}
  let bindObj = proxy_bind(inputObj)

  function change(e) {
    const val = e.value
    bindObj.val = val
  }
  
</script>
```