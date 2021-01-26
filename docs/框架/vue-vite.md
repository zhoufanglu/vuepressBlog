---
autoGroup-vue: vue
title: vite
categories: 框架
date: 2021-1-26
tags: [vue]
--- 

## 介绍
* 尤于溪的原话。
  ![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ed5b9c461e08455496ee9fbbf60a16a1~tplv-k3u1fbpfcp-watermark.image)
* `vite`与` Vue CLI` 类似，`vite `也是一个提供基本项目脚手架和开发服务器的构建工具。
* `vite`基于浏览器原生`ES imports`的开发服务器。跳过打包这个概念，服务端按需编译返回。
* `vite`速度比`webpack`快`10+`倍，支持热跟新， 但是出于处于测试阶段。
* 配置文件也支持热跟新！！！

## 创建
执行`npm init @vitejs/app` ，我这里选择的是`vue-ts`

![](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fa225caaf944f2b878a240d89a23e6d~tplv-k3u1fbpfcp-watermark.image)

## 版本
```
"vite": "^2.0.0-beta.48"
```

## alias别名
`vite.config.ts`
```
const path = require('path')
  alias: {
    "@": path.resolve(__dirname, "src"),
    "@c": path.resolve(__dirname, "src/components")
  },
```

1、
`npm i vue-router@4.0.2 --save`,安装4.0版本

2、`index.ts`
```js
import {createRouter, createWebHashHistory, RouteRecordRaw} from 'vue-router'
// @ts-ignore
const test = () => import('../views/test1.vue')
const routes: Array<RouteRecordRaw> = [
    {path: "/", redirect: "/test1"},
    {
        path: "/test1",
        name: 'test1',
        component: test,
    }
]
const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export default router
```
3、 `main.ts`
```js
import router from "./router"
createApp(App)
    .use(router)
    .mount('#app')
```

### 添加vuex(版本同样要4以上)
1、安装
`npm i vuex@index -D`

2、`store/index.ts`
```js
import { createStore } from 'vuex'

export default createStore({
  state: {
  },
  //...
})

```

3、`main.ts`
```js
import store from './store'

createApp(App)
    .use(store)
    .mount('#app')
```

### scss环境
1、安装`npm i sass -D`，可以直接使用sass语法了
2、vite.config.ts,全局引入scss文件
```js
css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@import "./src/assets/scss/global.scss";`//你的scss文件路径
      }
    }
  }
```