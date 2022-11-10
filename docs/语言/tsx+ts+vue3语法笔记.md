---
title: tsx+ts+vue3语法笔记
autoGroup-javascript: javascript  
categories: 语言
date: 2022-08-25
tags: [javascript]
---
### 1、参考 ts语法
[参考](https://juejin.cn/post/7018805943710253086)

### 2、ts数组定义
```js
  interface Menu {
    name: string
    path?: string
    icon?: string
    isCollect?: boolean
    children?: Menu[]
  }

  let menus = ref<Menu[]>([]) // 所有菜单
```

### 3、tsx对于vue3的基本语法
[github](https://github.com/vuejs/babel-plugin-jsx/blob/dev/packages/babel-plugin-jsx/README-zh_CN.md)

### 4、类型断言
```js
[] as Menu[]
```
```js
tabList: [] as any[]
```

### 5、any
#### 数组any
`let list: any[] = ['xcatliu', 25, { website: 'http://xcatliu.com' }];
`

### 6、??运算符

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8703a37a7d1e4c2b986a6d3e3d79de9e~tplv-k3u1fbpfcp-watermark.image?)

### 7、type, interface
* type 支持描述string, number,等基本类型 obj
* interface 只支持obj\fn, 可以继承

```js
// key 为 string， 值为任意值
type ObjectType = {
  [key: string]: any
}
const routerModules: ObjectType = {}
```

### 8、void,never,any,unknown
* void表示什么类型都没有，方法没有返回，就用这个void
* never 标识永远不会存在的值的类型
* any javascript, any = unknown
  区别: unknown与any的最大区别是： 任何类型的值可以赋值给any，同时any类型的值也可以赋值给任何类型。unknown 任何类型的值都可以赋值给它，但它只能赋值给unknown和any

### 9、object Object {}
object包含了Object, object继承了Object
{} = Object
```js
let obj:Object
obj = 1 //可行 , 除了null 和undefined 不能赋值
let obj:object
obj = 1 //类型错误
```

### 10、类型推断
> 在很多情况下，TypeScript 会根据上下文环境自动推断出变量的类型，无须我们再写明类型注解


### 11、类型断言
```js
// 尖括号 语法
let someValue: any = "this is a string";
let strLength: number = (<string>someValue).length;

// as 语法
let someValue: any = "this is a string";
let strLength: number = (someValue as string).length;
```
### 12、非空断言

在上下文中当类型检查器无法断定类型时，一个新的后缀表达式操作符 ! 可以用于断言操作对象是非 null 和非 undefined 类型。具体而言，x! 将从 x 值域中排除 null 和 undefined 。
```js
let x!:number
init()
console.log(x*2)
function init() {
    x = 10
}

```

### 13、svg-iconfont记录
```js
<svg class='icon' aria-hidden='true'>  <use xlinkHref='#icon-sousuo' /></svg>
```

### 14、插槽用法
#### naive-ui, NTooltip为例
```js
render(row:any){
  return(
    <div>
      {/*方法1 指令v-slots*/}
      <NTooltip trigger="hover"
                v-slots={{
                  trigger:()=>(<div>悬浮按钮</div>),
                  default:()=> '悬浮内容'
                }}
      >
      </NTooltip>
      {/*方法2 内部*/}
      <NTooltip>{{
        trigger: ()=><div>悬浮按钮</div>,
        default: ()=> '悬浮内容'}}
      </NTooltip>

      {/*方法3 h函数*/}
      {h(NTooltip, {}, {
        trigger: ()=><div>悬浮按钮</div>,
        default: ()=> '悬浮内容'
      })}

                  {/*<NButton>
                    <svg class='icon' aria-hidden='true'>
                      <use xlinkHref='#icon-sousuo'/>
                    </svg>
                  </NButton>*/}
    </div>
  )
}
```

### 15、vue3 + tsx中父子组件响应
#### 1、父组件传递给子组件 - props
* 父组件
> 例如`btnValue`就是传递的值, 这里跟vue2没什么大的差别
```js
setup() {
    return () => (
        <div>
            <DialogConfirm
                ref={dialogConfirmRef}
                btnValue={[1, 2, 3]}
                {...{onModalConfirm:modalConfirm}}
              />
        </div>
    )
}
```
* 子组件接收
> `btnValue就是接收的值`
```js
props: {
  btnValue: {
    type: Array
  }
},
setup(props, {emit, expose}) {
  const {info, title, btnValue} = props
  const visible = ref<boolean>(false)
  const handlePositiveClick = () => {
    emit('modalConfirm', true)
  }
  expose({visible})
  return () => (
   ...
  )
}
```

#### 2、父组件改变子组件的值
a.父组件`ref`获取子组件实例 `dialogConfirmRef`
```js
const dialogConfirmRef:any = ref(null)
dialogConfirmRef.value.visible = true // 改变他的值

<DialogConfirm
  ref={dialogConfirmRef}
  btnValue={[1, 2, 3]}
  {...{onModalConfirm:modalConfirm}}
/>
```
b.子组件暴露`visible`变量
```js
setup({expose}) {
    expose({visible})
}
```

#### 3、子组件传递父组件事件
a.子组件`emit`事件
```js
{
    emits: ['modalConfirm'], // 声明下
    setup(props, {emit}){
     emit('modalConfirm', true)
    }
}
```
b.父组件接收
* 需要结构赋值结构下方法， `onModalConfirm`代替`@modalConfirm`
```js
<DialogConfirm
  ref={dialogConfirmRef}
  btnValue={[1, 2, 3]}
  {...{onModalConfirm:modalConfirm}}
/>
```

### 16、tsx渲染dom的两种写法
#### 1、render()函数写法
* 1、需要写this， dom上不需要`.value`
* 2、需要return
```js
const tsxRenderType = defineComponent({
  name: 'tsxRenderType',
  setup() {
    // 变量
    const variable = ref('我是个变量')
    // 获取dom
    const childRef = ref(null)
    onMounted(()=>{
      console.log(11, childRef.value)
    })
    return {
      variable,
      childRef
    }
  },
  render() {
    return (
      <div>
        <div ref='childRef'>{this.variable}</div>
      </div>
    )
  }
})
```

#### 2、setup直接返回
* 不需要this, 不需要retrun
* 内容变量当做js来写
```
const tsxRenderType = defineComponent({
  name: 'tsxRenderType',
  setup() {
    // 变量
    const variable = ref('我是个变量')
    // 获取dom
    const childRef = ref(null)
    onMounted(() => {
      console.log(11, childRef.value)
    })
    return () =>(
      <div>
        <div ref={childRef}>{variable.value}</div>
      </div>
    )
  },
})
```

### 17、 jsx动态组件
```js
{h(resolveComponent(tab.componentName))}
```

