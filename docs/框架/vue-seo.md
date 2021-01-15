---
autoGroup-vue: vue
title: seo
categories: 框架
date: 2020-06-04
tags: [vue]
---
## SEO(Search Engine Optimization)
* 搜索引擎优化，更容易搜索到该页面。

## 实现
### 1、利用插件`prerender-spa-plugin`
* [文档](https://github.com/chrisvfritz/prerender-spa-plugin) 
* node安装 
```
npm i prerender-spa-plugin -D
``` 
* 版本  
```json
{
  "prerender-spa-plugin": "^2.1.0",
  "@vue/cli": "~4.4.0"
}
```
### 2、`vue.config.js`配置
```js
//prerender-spa-plugin
const PrerenderSPAPlugin = require('prerender-spa-plugin')
const Renderer = PrerenderSPAPlugin.PuppeteerRenderer
module.exports = {
    if (process.env.NODE_ENV === 'production') {
        return {
          plugins: [
            new PrerenderSPAPlugin({
              // 生成文件的路径，也可以与webpakc打包的一致。
              // 下面这句话非常重要！！！
              // 这个目录只能有一级，如果目录层次大于一级，在生成的时候不会有任何错误提示，在预渲染的时候只会卡着不动。
              staticDir: path.join(__dirname,'dist'),
              // 对应自己的路由文件，比如a有参数，就需要写成 /a/param1。
              routes: ['/', '/home', '/page1'],
              // 这个很重要，如果没有配置这段，也不会进行预编译
              renderer: new Renderer({
                inject: {
                  foo: 'bar'
                },
                //headless: false,
                // 在 main.js 中 document.dispatchEvent(new Event('render-event'))，两者的事件名称要对应上。
                renderAfterDocumentEvent: 'render-event'
              })
            }),
          ]
        }
    }
}
```   
### 3、`main.js`配置
```js
new Vue({
  mounted () {
    document.dispatchEvent(new Event('render-event'))
  }
}).$mount('#app')
```
### 4、路由配置
* 这里需要用`history`模式，必须！
```js
const home = () => import('@/views/home/home.vue')
const page1 = () => import('@/views/home/page1.vue')
const routes = [
  {
    path: '/home',
    name: 'home',
    mode: 'history',
    component: home
  },
  {
    path: '/page1',
    name: 'page1',
    mode: 'history',
    component: page1
  }
]
```  

### 5、配置每个路由的`meta`  
* 这里推荐使用`vue-meta`
* [文档](https://github.com/nuxt/vue-meta)  
* 安装
```
npm i vue-meta -D
```
* 在`main.js`中配置  
```js
import VueMeta from 'vue-meta'

Vue.use(VueMeta, {
  // optional pluginOptions
  refreshOnceOnNavigation: true
})
``` 
* 路由内的使用`home.vue`  
```js
export default {
    name: 'home',
    components: {},
    metaInfo: {
      title: 'xxxx，代理进口公司-专注进口清关代理、国际海运、仓储物流服务',
      meta: [
        { charset: 'utf-8' },
        { name: 'keywords', content: '代理进口公司,进口清关代理,国际海运,仓储物流,xxxx'},
        { name: 'description', content: 'xxxx是全球领先的进口清关跨境贸易综合服务平台'}
      ]
    },
}
```  
* 效果
![页面效果](https://github.com/zhoufanglu/markdownPhoto/blob/master/hexo/seo.png?raw=true)

## 最后打包
```
npm run build
```
* `dist`内的目录接口   
```
dist
│   css
│   js
|   index.html
└───home
│   │   index.html
└───|   
│   |
└───page1
    │   index.html
```
* 如果目录内是这样的解构说明成功了

## seo查询工具
* [地址](https://www.sojson.com/seocheck/) 

## 参考
* [参考](https://www.jianshu.com/p/6a4c0b281e7f)