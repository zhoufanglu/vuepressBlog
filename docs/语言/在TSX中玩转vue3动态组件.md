---
title: 在TSX中玩转vue3动态组件
autoGroup-javascript: javascript  
categories: 语言
date: 2023-2-15
tags: [javascript]
---
## 背景
> 父组件需要引入多个子组件，我们可以批量引入注册，批量渲染。

## 1、目录结构&动态路由
### 1-1、目录结构
* 结构

![MH{7M@%TL8)11QP}9L@)1`4.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4af8ed0632484135b732bc31c8d6f472~tplv-k3u1fbpfcp-watermark.image?)


* 展开

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/db957f9c97774a7f96de70f3efedcd8c~tplv-k3u1fbpfcp-watermark.image?)

## 2、动态引入
* 可以参考怎么动态引入组件 [戳这里](https://juejin.cn/post/6966792884838203428)
### 2-1、代码
> 我这里用的`vite`, 所以用`import.meat.glob`引入。  
> 这里注意一下，需要用到异步加载组件 [defineAsyncComponent](https://vuejs.org/guide/components/async.html), 不然组件识别不到。
```js
import { defineAsyncComponent } from 'vue'
// 动态引入4个组件
const ms = import.meta.glob('./**.tsx')
let modules: any = {}
Object.keys(ms).forEach((key) => {
  const index = key.split('/')[1] // 这里根据自己目录情况所操作
  modules[index] = defineAsyncComponent(ms[key]) // 异步加载组件
})
```
### 2-2、组件内容打印

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/23bb9d3beaed4d2cb11ccb21c1482e4b~tplv-k3u1fbpfcp-watermark.image?)

### 2-3、注册组件
```js
const RightToolBar = defineComponent({
  name: 'rightToolbar',
  components: {
    ...modules
  },
  setup() {}
}
```

## 3、动态组件的批量渲染
> 1、在`模板语法`中 我们直接用`comoponent`就行，在`tsx`中我们需要用到`resolveComponent`  
> 2、我们怎么拿到每个子组件的实例ref对象? 渲染的时候进行绑定ref并且进行赋值就好，参考如下`drawers`
```jsx
import {
  defineComponent,
  h,
  resolveComponent,
  defineAsyncComponent
} from 'vue'

setup () {
    const componentNames = Object.keys(modules) // 拿到所有的组件名称,tsx中也能渲染中划线名称的组件
    
    // 各种子组件drawers组件实例对象
    const drawers = reactive([])

    return ()=> (
        <div>
            {componentNames.map((name, index) =>
              h(resolveComponent(name), {
                ref: (el) => {
                  drawers[name] = el
                }
              })
            )}
        </div>
    )
}
```
