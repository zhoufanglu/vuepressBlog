---
title: vue中引入高德
tags:
  - vue
date: 2020-03-26 09:52:50
---

<meta name="referrer" content="no-referrer" />

# 研究
* 我们并不需要每个路由都使用到地图
* `index.html`全局引入`cdn`会增加首屏加载速度
* 所以我们需要按需引入的一个方法

# 方案
* 创建一个`amap.js` 
 

```javascript
let amapKey = '你申请的key'
let amapVersion = '1.4.15'
let _createScript = (url) => {
  var tmp = document.createElement('script')
  tmp.charset = 'utf-8'
  tmp.src = url
  document.head.appendChild(tmp)
}

export default () => {
  return new Promise((resolve, reject) => {
    if (!window.AMap) { //判断window下有没有AMap对象，再判断是否引入cdn地图
      _createScript(`//webapi.amap.com/maps?v=${amapVersion}&key=${amapKey}.Key&callback=aMapInitCallback`)
      window.aMapInitCallback = () => {
        _createScript('//webapi.amap.com/ui/1.0/main.js?v=1.0.11&callback=amapUiCallback')
        // 创建定时器 当AMapUI有值的时候 清除定时器 并resolve
        let interval = setInterval(() => {
          if (window.AMapUI) {
            clearInterval(interval)
            resolve(window.AMap)
          }
        }, 50)
      }
    } else resolve(window.AMap)
  })
}
```

# 在路由内的使用
* `index.vue`

html 

```html
<template>
    <div class="p-map">
      <div id="mapContainer"><!--渲染地图的div-->

      </div>
    </div>
</template>
``` 
 
 
```javascript
import MapLoader from "../../../../utils/amap";//引入刚刚新建的amap.js
methods: {
    loadMap() {
      const _this = this
      MapLoader().then(AMap => {
        console.log('地图加载成功')
        this.map = new AMap.Map('mapContainer', {
          center: [117.000923, 36.675807],
          zoom: 6
        })
        //map初始化插件
        AMap.plugin(['AMap.ToolBar'],function(){
          _this.map.addControl(new AMap.ToolBar());
        })
      }, e => {
        console.log('地图加载失败' ,e)
      })
    },
}
```
* 这样就成功了。这样的话`api`需要看原生的高德`api`来写。