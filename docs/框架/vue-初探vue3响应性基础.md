---
autoGroup-vue: vue
title: vue-初探vue3响应性基础
categories: 框架
date: 2020-10-16
tags: [vue]
---  
<Meta/>  

> 由于还不会jsx,先使用`vue3+typescript+template`模式  
> 网上还有一种`tsx+vue`模式
> 以下代码都使用vue3语法（vue3也可以使用vue2语法）

## 1、项目创建
* 官网需要vue-cli4+版本才能创建
* [官网](https://cli.vuejs.org/zh/guide/creating-a-project.html)
* 选择vue3+typescript就可以

## 2、生命周期
* 与vue2对比，把beforCreate与created合并成了setUp(在他两之前执行)
```js
vue2-------------vue3
//创建组件前后
beforeCreate  -> setup()
created       -> setup()
//组件挂载到dom前后
beforeMount   -> onBeforeMount
mounted       -> onMounted
//组件更新前后
beforeUpdate  -> onBeforeUpdate
updated       -> onUpdated
//组件销毁/删除前后
beforeDestroy -> onBeforeUnmount
destroyed     -> onUnmounted
```  
* 上代码
```js
<script lang="ts">
import { //现在使用的方法都要按需引入
  onBeforeMount,
  onMounted,
  onBeforeUpdate,
  onUpdated,
  onBeforeUnmount,
  onUnmounted
} from 'vue'

export default {
  name: "生命周期",
  setup() {
    console.log('1---setup,组件创建之前')
    onBeforeMount(()=>{
      console.log('2---onBeforeMount,组件挂载到dom前')
    })
    onMounted(()=>{
      console.log('3---onMounted,组件挂载到dom后')
    })
    //组件更新前后--比如数据更新后，会触发组件更新
    onBeforeUpdate(()=>{
      console.log('4---onBeforeUpdate,组件更新前')
    })
    onUpdated(()=>{
      console.log('5---onUpdated,组件更新后')
    })
    //组件销毁前后  节点删除或替换会触发
    onBeforeUnmount(()=>{
      console.log('6---onBeforeUnmount，卸载组件前')
    })
    onUnmounted(()=>{
      console.log('7---onBeforeUnmount，卸载组件后')
    })
  }
}
</script>
```
* 结果  
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4dadf9ea416d4ad6a587385383d8ffc5~tplv-k3u1fbpfcp-watermark.image)

## 3、响应式
* [api参考](https://vue3js.cn/docs/zh/api/basic-reactivity.html#reactive)

### 3.1 ref
> 一般使用于基本类型  

```js
const refCount = ref<number>(0)
refCount.value = 2 //修改时需要加上.value
```
### 3.2 reactive
> 一般使用于引用类型 

* 我们来实现一个标题点击选中的代码,效果如下  
![](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5be40f1977bf4083ba50290c2ff1220d~tplv-k3u1fbpfcp-watermark.image)

* 代码 

template
```html
<template>
  <div class="life-cycle">
    <span v-for="(i,index) in tabTitle.list"
      :key="i"
      @click="tabTitle.titleClick(index)"
      :class="i===tabTitle.currentTitle?'active':''"
    >
      {{i}}
    </span>
    <div>当前选中的标题：{{tabTitle.currentTitle}}</div>
  </div>
</template>
```
script 

```js
<script lang="ts">
import {
  ref,
  reactive
} from 'vue'
//定义接口
interface TabTitleProps {
  list: string[],
  currentTitle: string,
  titleClick: (index: number) => void
}
export default {
  setup() {
    const tabTitle = reactive<TabTitleProps>({
      list: ['标题A', '标题B', '标题C'],
      currentTitle: '',
      titleClick: (index:number)=>{
        tabTitle.currentTitle = tabTitle.list[index]
      }
    })
    //可以理解为vue2中的data(){return{}}
    return {
      tabTitle
    }
  }
}
</script>
```

## 4、template
* 可以这么玩了
```js
<template>
	<div></div>
    <div></div>
<template>
```

## 5、watch
* 以下代码都在`setup`方法内执行，要引入`watch`
### 5.1 监听单个值（ref）
```js
//watch
    /**
     * refCount:监听的值， refCount 新的值， prevRefCount 旧的值
     */
    const refCount = ref<number>(1)
    watch(refCountTwo, (newVal:number, oldVal:number):void=>{
      console.log('new值', newVal)  // 2
      console.log('old值', oldVal)  // 1
      console.log('-------------')
    })
    setTimeout(()=>{
      refCount.value++
    }, 2000)
```

### 5.2 监听多个值 (ref)
```js
    const refCount = ref<number>(1)
    const refCountTwo = ref<number>(100)
//watch 多个
    /**
     * refCount:监听的值， refCount 新的值， prevRefCount 旧的值
     */
    watch([refCount, refCountTwo], (newVal:number, oldVal:number):void=>{
      console.log('new值', newVal)  //[2, 101]
      console.log('old值', oldVal)  //[1, 100]
      console.log('-------------')
    })
    
    setTimeout(()=>{
      refCount.value++
      refCountTwo.value++
    }, 2000)
```

### 5.3 深度监听 (reactive)
```js
cosnt person = {
    name: 'lfz',
    age: 11
}
```
* 例如要监听`person`内的`age`属性 
```js
setup(){
    watch(() => personA.age, (newVal: number, oldVal: number): void => {
      console.log('new值', newVal)
      console.log('old值', oldVal)
      console.log('-------------')
    })
    setTimeout(()=>{
      personA.age++
    },1000)
}
```

## 6、watchEffect
* 这个直接监听了所有值变化的问题
* 感觉这个比`watch`好用
```js
//改变person.age后就执行
watchEffect(()=>{
      console.log(36, personA.age)
})
```
## 7、computed
* template
```html
<template>
<div>
  <div>a:{{a}}</div>
  <div>b:{{b}}</div>
  <div>a+b={{addVal}}</div>
</div>
</template>
```

* script
```js
<script lang="ts">
import {ref, computed} from 'vue'
export default {
  name: "computed",
  setup(){
    const a = ref<number>(1)
    const b = ref<number>(1)
    const addVal:number = computed(():number=> a.value+b.value)
    return {
      addVal,
      a,
      b
    }
  }
}
</script>
```