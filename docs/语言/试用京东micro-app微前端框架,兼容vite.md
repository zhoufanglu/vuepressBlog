---
title: 试用京东micro-app微前端框架,兼容vite
autoGroup-javascript: javascript  
categories: 语言
date: 2022-07-07
tags: [javascript]
---
## 背景
> 公司内部突然有个微前端想法，整合项目， 但是我们新项目都是`vue3 + vite`, 就简单考察了下微前端框架。
* 需求应用间耦合性小
* 项目方便升级，可以独立发布，主要能兼容`vite`
* 最终暂定了[microp](https://micro-zoe.github.io/micro-app/docs.html#/)
  ![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f6ac5d8d6fae46349a8375d2d6870abe~tplv-k3u1fbpfcp-watermark.image?)

**本文主要介绍的是`vite`环境的一些兼容`micro-app`配置**

## 1、实现效果

![ced32DKcxP.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/086b7cab32f64809ae41eaa50b91d7b4~tplv-k3u1fbpfcp-watermark.image?)

## 2、项目主要结构
* 基座应用为`main-app`, 环境为`vite + vue3`
* 子应用为`child-app-1`, 环境为`vite + vue3`
  ...
```
└─ main-app (基座-history路由- vite+ vue3)
    └─child-app-1 (子应用- hash路由 - vite+ vue3)
    └─child-app-2 (子应用- hash路由 - vite+ vue3)
```
## 3、父子应用版本 & 仓库
* 版本
```
"@micro-zoe/micro-app": "^0.8.6",
"vite": "^2.9.5",
```
* [gihub-demo-仓库](https://github.com/zhoufanglu/micro-app-study-2)
## 4、代码配置
主应用 `main-app`, `history`路由  
子应用 `child-app-1`, `hash`路由

### 4.1 基座应用`main-app`
* 安装
```
npm i @micro-zoe/micro-app --save
```
#### 4.1.1 main.js
* `main.js`中注入子应用 , 我这里子应用叫`child-app-1`

```js
import microApp from '@micro-zoe/micro-app'
// 微前端-microApp-注入
microApp.start({
  plugins: {
    modules: {
      // appName即应用的name值
      'child-app-1': [
        {
          loader(code) {
            if (process.env.NODE_ENV === 'development') {
              // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
              // eslint-disable-next-line no-param-reassign
              code = code.replace(/(from|import)(\s*['"])(/child-app-1/)/g, all => {
                return all.replace('/child-app-1/', 'http://localhost:4001/child-app-1/')
              })
            }
            return code
          }
        }
      ],
      bdcp: [
        {
          loader(code) {
            if (process.env.NODE_ENV === 'development') {
              // 这里 basename 需要和子应用vite.config.js中base的配置保持一致
              // eslint-disable-next-line no-param-reassign
              code = code.replace(/(from|import)(\s*['"])(/bdcp/)/g, all => {
                return all.replace('/bdcp/', 'http://localhost:5001/bdcp/')
              })
            }
            return code
          }
        }
      ]
    }
  }
})
```
#### 4.1.2 路由配置
* 配置路由， 让包含`child-app-1`的路由 都重定向到这里来
```js
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
      name: 'vue3Vite',
      // 👇 非严格匹配，/my-page/* 都指向 vue3-vite 页面
      path: '/child-app-1/:page*',
      component: '自己填路径'
    },
]
const router = createRouter({
  // history模式
  history: createWebHistory(import.meta.env.BASE_URL),
  routes // `routes: routes` 的缩写
})
```
#### 4.1.3 渲染路由
* html
> url根据开发和生产环境自己切换
> 这边注意 vite需要关闭沙箱
```html
<micro-app
  name="child-app-1"
  url="http://localhost:4001/child-app-1/"
  inline
  disableSandbox
></micro-app>
```

#### 4.1.4 菜单-sideBar
* 流程
> 由于父子应用都是`vite`, 关闭了沙箱，我们需要父应用控制子应用进行路由跳转

* 子应用跳转关键代码
```js
import microApp, { EventCenterForMicroApp, getActiveApps } from '@micro-zoe/micro-app'

// 因为vite子应用关闭了沙箱，我们需要为子应用child-app-1 创建EventCenterForMicroApp对象来实现数据通信
window.eventCenterForChildApp_1 = new EventCenterForMicroApp('child-app-1')

/**
 * 当子应用还未渲染，通过基座控制路由跳转，子应用在初始化时会自己根据url渲染对应页面
 * 当子应用已经渲染，则直接控制子应用进行内部跳转
 *
 * getActiveApps: 用于获取正在运行的子应用
 */
const menuItemClick = item => {
    console.log(96, '获取已经渲染的子应用', getActiveApps())
    // eslint-disable-next-line prefer-const
    let { appFrom: appName, path } = item // item为菜单点击的对象
    console.log(114, '应用名和地址', appName, path)
    // 子应用未加载
    if (!getActiveApps().includes(appName)) {
      // 这里默认是hash, 初始化path 这里拼接一下hash值
      const pushPath = `/${appName}/#${path}`
      console.log('主应用控制跳转--------->')
      // 主应用跳转
      router.push(pushPath)
    }
    // 子应用已加载
    else {
      // 传递事件给子应用， 然后让子应用跳转
      console.log('子应用控制跳转--------->')
      // 向子应用传递路由 让子路由进行跳转
      microApp.setData(appName, { path: item.path })
    }
}
```
### 4.2 子应用`child-app-1`
#### 4.2.1 vite.config.js
```js
plugins: [
  vue(),
  // 自定义插件
  (function () {
    let basePath = "";
    return {
      name: "child-app-1", //组件名称
      apply: "build",
      configResolved(config) {
        basePath = `${config.base}${config.build.assetsDir}/`;
      },
      writeBundle(options, bundle) {
        for (const chunkName in bundle) {
          if (Object.prototype.hasOwnProperty.call(bundle, chunkName)) {
            const chunk = bundle[chunkName];
            if (chunk.fileName && chunk.fileName.endsWith(".js")) {
              chunk.code = chunk.code.replace(
                /(from|import()(\s*['"])(..?/)/g,
                (all, $1, $2, $3) => {
                  return all.replace($3, new URL($3, basePath));
                }
              );
              const fullPath = join(options.dir, chunk.fileName);
              writeFileSync(fullPath, chunk.code);
            }
          }
        }
      },
    };
  })(),
],
server: {
  host: '0.0.0.0',
  port: 4001
},
base: `${process.env.NODE_ENV === 'production' ? 'http://www.lufangzhou.top:3307' : ''}/child-app-1/`,
```
#### 4.2.2 main.js
* 进行监听基座应用菜单点击事件，进行跳转
```js
// 监听跳转
if(window.eventCenterForChildApp_1){
  window.eventCenterForChildApp_1.addDataListener((data) => {
    // 当基座下发跳转指令时进行跳转
    if (data.path && typeof data.path === 'string') {
      console.log(12, data.path)
      data.path = data.path.replace(/^#/, '')
      // console.log(13, router.currentRoute.value.path)
      // 当基座下发path时进行跳转
      if (data.path && data.path !== router.currentRoute.value.path) {
        // console.log('child-app-1响应事件', data)
        router.push(data.path)
      }
      // console.log('------------------------')
    }
  }, true)
}
// 监听销毁事件
/** ********************监听事件***********************/
window.addEventListener(`unmount-child-app-1`, destroyWindowListen, true)

function destroyWindowListen() {
  window.eventCenterForChildApp_1?.clearDataListener()
  // console.log(34, '监听卸载事件')
  window.removeEventListener('unmount-child-app-1', destroyWindowListen, true)
}
```

#### 4.2.3 应用名
> 由于没有沙箱， 把应用名改为`child-app-1`, 确保唯一性
```
<div id="child-app-1"></div>
```

## 5、问题
### 5.1 `[Vue warn]: Failed to resolve component: micro-app`
* 注入自定义组件识别
```
plugins: [
  vue({
    template: {
      compilerOptions: {
        // 注册自定义组件micro-app 防止控制台警告
        isCustomElement: tag => /^micro-app/.test(tag)
      }
    }
  }),
],
```
### 5.2 路由回退问题
* [issues 155](https://github.com/micro-zoe/micro-app/issues/155)

### 5.3 子应用本地资源404
* 使用路径包装下
``` js
const logoPath = new URL('../src/assets/logo-child.png', import.meta.url).href
```
