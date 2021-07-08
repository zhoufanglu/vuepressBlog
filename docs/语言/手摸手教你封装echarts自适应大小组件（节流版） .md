---
autoGroup-javascript: javascript  
title: 手摸手教你封装echarts自适应大小组件（节流版）
categories: javascript
tags: javascript
date: 2021-5-6 14:16:14
--- 

<Meta/>  

## 源代码
>[代码地址](https://github.com/zhoufanglu/echart-resize-vue)

## 需要效果如下(无节流版效果)
> 我们可以看到没有节流会有一点卡顿
![Z475T0S74G.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0d38b4d67ba1433d95eee3ac29ca3a64~tplv-k3u1fbpfcp-watermark.image)

## 思路
1、把这三个图表抽离出一个公共组件  
2、在组件内进行监听窗口 `window.addEventListener('resize', fn)`  
3、最后组件直接响应图表视图`chart.resize()`


**笔者这里用的是`vue`,所以以`vue`为标准**

## 1、创建公共组件`chartComponent.vue`
> 组件`props`接收 `chartId`, echarts绑定的对象`domId`,  
> 组件`props`接收 `option`, echarts的`options`属性,    
> [图表渲染完成事件](https://juejin.cn/post/6938574522673004581)参考之前写的一篇

创建图表公用组件`chartComponent.vue`

* `javascript`



```javascript
<script>
import * as echarts from 'echarts'
export default {
  name: 'chartComponent',
  props: {
    chartId: { type: String, required: true },//图表id
    option: { type: Object, default: () => {} }, //图表属性
    loading: { type: Boolean, default: false }// 可不写loading状态
  },
  data() {
    return {
      myChart: null,
      isFinished: false
    }
  },
  methods: {
    drawChart() {
      this.myChart.setOption(this.option, true)
    },
    chartResize() {
      this.myChart.resize()
      console.log('重置大小')
    }
  },
  mounted() {
    if (!this.myChart) {
      this.myChart = echarts.init(this.$refs[this.chartId])
    }
    //监听窗口大小变化
    window.addEventListener('resize', this.chartResize)
    this.drawChart()

    this.myChart.on('finished', () => {
      if (!this.isFinished) {
        console.log('finished')
        this.isFinished = true
        this.myChart.resize()
      }
    })
  },
  beforeDestroy() {
    //销毁window监听对象
    window.removeEventListener('resize', this.chartResize)
    if (this.myChart) this.myChart.dispose()
    this.myChart = null
  },
  watch: {
    //数据可能是异步的，用watch接听接收
    option: {
      handler(newVal) {
        const options = newVal
        this.drawChart(options)
      },
      deep: true
    }
  }
}
</script>
```
* `html,css`
```html
<template>
  <div class="chart-box" :ref="chartId"></div>
</template>

<style lang="scss" scoped>
.chart-box {
  width: 100% !important;
  height: 100% !important;
}
</style>
```
## 2、使用
* 直接引入使用就好
```html
  <chartComponent chartId="chart_a" :option="option"></chartComponent>
```

---
**细心的朋友发现没有节流，好了，我们在`chartResize`上增加节流， 没有节流会有明显的卡顿**

## 3、增加节流
> 1、引入节流方法（可以自己网上找，也可以用`lodash`的节流）,这里就不写节流的具体内容  
> 2、在`chartResize`方法上绑定节流

* 在 `chartCompont`中引入`throttle`方法

```javascript
import { throttle } from '../util/tool'

//为上面的chartResize方法增加节流
methods: {
    ...
    //绑定上节流方法
    chartResize: throttle(function () {
      this.myChart.resize()
      console.log('重置大小')
    }, 2000)
}
```

## 4、效果 （节流版本，但是有问题）

![vYcksxS3F7.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e080464bb7ca44acb8c297849efa61ef~tplv-k3u1fbpfcp-watermark.image)



<h3 color='red'>???什么东西，为什么只有最后一个图表重置大小了,其它没变化？？</h3>

## 5、分析原因
> 节流确实生效了，问题是什么？  
> 因为在一个页面内使用了多次这个组件，由于`节流是异步`的, 暂时只能记录最后一个组件对象  
> 所以只会响应`resize`最后一个

## 6、解决方法
> 其实我们更优的方法，应该把监听窗口事件（``window.addEventListener('resize', fn)``）抽离到最外层，而不是在组件内
### 我的思路-使用`vuex`
> 1、在全局中监听`window.addEventListener('resize', fn)`，套上节流。  
> 2、把监听到的窗口大小存在`vuex`内
> 3、在我们的`chartCompnent.vue`组件中监听`vuex`的窗口大小

## 7、最终效果（带节流）
> 加了节流之后，会顺畅很多

![walSebLwxu.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b21b2b96f7d94462b5f045f7a02b95de~tplv-k3u1fbpfcp-watermark.image)

## 8、部分优化代码，vuex,onResize提取
###  vuex-window模块
> 新建vuex的window模块，用来存放页面的宽高。
```js
const window = {
  state: {
    //页面的宽高
    innerWH: {}
  },

  mutations: {
    SET_INNER_WH(state, val) {
      //state.innerWH = { ...Object.assign(state.innerWH, val) }
      state.innerWH = val
    }
  },

  actions: {
    setInnerWH({ commit }, val) {
      commit('SET_INNER_WH', val)
    }
  }
}

export default window

```  


### main.js内引入的监听onResize.js文件
> 全局监听窗口大小，并且存入vuex
`onResize.js`
```js
import { throttle } from './tool'//节流方法

//vuex对象
import store from '@/store/index'

const windowFn = throttle(
  function () {
    let innerWH = {
      innerWidth: window.innerWidth,
      innerHeight: window.innerHeight
    }
    store.dispatch('setInnerWH', innerWH)
  },
  1000,
  { leading: false }
)

//全局监听窗口大小变化事件
window.addEventListener('resize', windowFn)

```

### 组件内的监听vuex内数据-chartComponent
`chartComponent`
```js
//监听vuex内的窗口大小
watch: {
    innerWH: {
      handler() {
        console.log('窗口resize')
        this.myChart.resize()
      },
      deep: true
    }
}

```

## 9、总结思路
> 全局监听窗口大小， 把窗口大小存在`vuex`内 ,节流在这里加上。   
> 在`echarts`组件中监听`vuex`内的窗口大小,从而响应图表大小  
> 尽量不要使用flex,grid布局，会使resize()失效，[之前在github上的提问](https://github.com/apache/echarts/issues/15049)

---

## 10、新增模拟接口loading时加载状态
> `chart_3`效果, 模拟接口刷新属性的Loading状态
> 利用`chart.on('finished', () => {})` 来控制关闭loading

![SwgWGp4c2w.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8c6d2fb691be4bb49c30206b72f3229d~tplv-k3u1fbpfcp-watermark.image)
* chart_3.vue
```html
<!--html-->
<chartComponent
      :loading="loading"
      chartId="chart_c"
      :option="option"
      @closeLoading="closeLoading" <!--接收子组件关闭loading事件-->
      ref="chartComponent"
    ></chartComponent>
```
```js
//js
methods: {
    initChart() {
        this.loading = true
        //ajax.. 调用接口，拿到数据，这里用setTimout模拟
        setTimeout(()=>{
            this.option = {...}
        }, 1000)
    }
    closeLoading() {
        console.log(85, '关闭loading')
        this.loading = false
    },
}
```
* chartComponent.vue
```js
    //finished事件，麻烦，Hover，click事件都会触发，但是也是真的图表完成事件
    this.myChart.on('finished', () => {
      /**********************只有在Loading状态的时候才能关闭***********************/
      if (this.loading) {
        //如果还是加载状态，关闭Loading
        this.$emit('closeLoading')
      }
      /**********************只有在第一次的时候重置大小***********************/
      if (!this.isFirstFinished) {
        this.isFirstFinished = true
        setTimeout(() => {
          this.myChart.resize()
        })
      }
    })
```
