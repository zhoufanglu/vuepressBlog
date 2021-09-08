---
autoGroup-vue: vue
title: vue中自动化引入组件，模块
categories: 框架
date: 2021-5-27
tags: [vue]
--- 
## 背景
> 在日常引入组件，模块的时候，其实目录格式都差不多，能不能一键引入所有呢？  
> 通过查阅，[require.context](https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)可以帮助我们实现这个功能。需要`vue-cli3+`的版本。

## require.context
> 如果你恰好使用了 webpack (或在内部使用了 webpack 的 Vue CLI 3+)，那么就可以使用 require.context 只全局注册这些非常通用的基础组件 ---摘自[vue官方](https://cn.vuejs.org/v2/guide/components-registration.html#%E5%9F%BA%E7%A1%80%E7%BB%84%E4%BB%B6%E7%9A%84%E8%87%AA%E5%8A%A8%E5%8C%96%E5%85%A8%E5%B1%80%E6%B3%A8%E5%86%8C)

## 1、组件内-自动化引入
### 目录
* 组件目录有两层，因为项目的特殊性，差不多有30个组件，一个一个引入非常麻烦
  ![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9e9c14dea5154be39464ae6cca833555~tplv-k3u1fbpfcp-watermark.image)
* 传统引入, 万一有很多就麻烦了。。
```js
import BaseButton from './BaseButton.vue'
import BaseIcon from './BaseIcon.vue'
import BaseInput from './BaseInput.vue'

export default {
  components: {
    BaseButton,
    BaseIcon,
    BaseInput
  }
}
```

### 自动化引入代码
* 在组件内引入
```js
const requireComponent = require.context(
    // 其组件目录的相对路径,这里根据实际目录而定
    './companyModel',
    // 是否查询其子目录,我这里有两层，所以true
    true,
    // 匹配基础组件文件名的正则表达式，我这里vue文件都要
    /\.vue$/
)

let modules = {} //组件模块

requireComponent.keys().forEach(ele=>{
  let key = ele.split('/')[2]
  key = key.substring(0, key.length-4) //获取文件名，不包含.vue,其实是模块名、PD1,PD2,PD3,ST1...
  modules[key] = requireComponent(ele).default //模块实例赋值
})
//最后塞入组件内
export default {
   components: modules,
   data() {} 
}
```

## 2、vuex-模块自动化引入
* 其实跟组件差不多，`vuex`的模块一定要`export`

### 目录
* 很传统的一个vuex目录

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ec53c724d66749d084e1e2a7f93908b1~tplv-k3u1fbpfcp-watermark.image)

### 自动化引入代码
* index.js内
```js
let ms = require.context('./modules', false, /\.js$/) //这里只有一层，所以是false ,匹配js
let modules = {}
ms.keys().forEach(ele => {
  let n = ele.substring(2, ele.length - 3) //一样，拿到文件名，去除后缀
  modules[n] = ms(ele).default
})

export default new Vuex.Store({
  modules,
})

``` 

## 3、总结
> 我们可以通过`require.context`可以自动化引入文件。  
> 其实我们不单单局限于组件，路由内， 所有模块文件都是通用的， 例如路由， 接口封装模块，都是可以使用的。
