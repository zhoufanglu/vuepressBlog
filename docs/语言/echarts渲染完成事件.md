---
title: echarts渲染完成事件
autoGroup-javascript: javascript  
categories: echarts
tags: [javascript]
---
 
<Meta/>  

## 背景
* 需要`自适应大小`
* 需要`loading`加载。
* 效果如下

![NLKdGNKg7m.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/87c3cfa40c3c4e299b5a310ff2ca20c4~tplv-k3u1fbpfcp-watermark.image)

## `echarts`加载完成事件API

### 1、events. rendered
* [官方介绍](https://echarts.apache.org/zh/api.html#events.finished)
> 渲染结束事件。注意 rendered 事件并不代表渲染动画（参见 animation 相关配置）或者渐进渲染（参见 progressive 相关配置）停止，只代表本帧的渲染结束。

### 2、events. finished
>渲染完成事件。当渲染动画（参见 animation 相关配置）或者渐进渲染（参见 progressive 相关配置）停止时触发。


## 执行
> 我们首先要在渲染之前打开`loading`  
> 然后渲染完成之后关闭`loading`  
> 渲染完成这里选用的是`finished`事件
* 在vue中
  **template**
```html
<div class="p-line-charts-out">
    <div v-show="!isLoading"  class="p-line-charts" ref="lineCharts"></div> <!--图表dom对象-->
    <dv-loading v-show="isLoading">Loading...</dv-loading> <!--loading组件-->
</div>
```
**javascript**
```js
//渲染前
this.isLoading = true

this.chart = this.$echarts.init(this.$refs.lineCharts)
//渲染后
this.chart.on('finished',_=>{
        this.isLoading = true
        console.log(113, 'finished')
})

``` 
**scss**
```css
<style lang="scss" scoped>
.p-line-charts-out{
  height: 100%;
  width: 100%;
  .p-line-charts {
    width: 100%!important;
    height: calc(100% - 25px)!important;
  }
}
</style>
```

* 但是`finished`事件有个问题，就是悬浮，点击事件也会触发钩子函数
> 如下

![AU8Gf1QMhw.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b5e86c93925412c858d491c9c96b94d~tplv-k3u1fbpfcp-watermark.image)


## 解决方法-1
> 如果 finished(rendered) 事件对你有用，那完全可以定义一个变量标识是否为首次渲染，默认true，回调函数执行后，标识其为false，解绑该事件不再继续执行相关代码即可
```js
  const option = {...} //charts配置项

  let isFinished = false //标记 isFinished
  
  this.chart.on('finished',_=>{
    if(!isFinished){
      console.log('我只执行一次')
      isFinished = true
      this.isLoading = false //关闭loading
      this.chart.resize() //重新渲染charts大小
    }
    console.log(113, 'finished')
  })
  
  this.chart.setOption(option)
```

## 解决方法-2
> 利用异步编程`promise`，把完成后的动作放到异步队列中
```js
      const chartsPromise = new Promise(resolve => {
        const option = {...} //echarts配置

        this.chart = this.$echarts.init(this.$refs.lineCharts)

        this.chart.on('finished',_=>{ 
          resolve() //把执行结果抛出去
        })

        this.chart.setOption(option)
      })
      
      //promise resolve
      chartsPromise.then(_=>{
        this.isLoading = false//Loading标识关闭
        setTimeout(_=>{
          this.chart.resize() //宏任务队列中切换echarts大小
        })
        console.log('渲染完成promise')
      })
      
```
