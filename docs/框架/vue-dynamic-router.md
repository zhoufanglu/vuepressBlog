---
autoGroup-vue: vue
title: vue中动态路由实现
categories: 框架
date: 2021-5-17
tags: [vue]
--- 

## 整体流程

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9dc4e84d363a48178d272b8e56ae7506~tplv-k3u1fbpfcp-watermark.image)

## 实现效果
> 不同用户登陆显示不同侧边路由导航

![UNslVkIXnP.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e096ba259b784f9780f4ea21bae78157~tplv-k3u1fbpfcp-watermark.image)

## 代码已经上传到github
[代码地址](https://github.com/zhoufanglu/dynamic-vue-router)

## 流程
1、用户登陆，获取后端返回的路由   
2、使用`router.addRoute`动态添加到路由 [文档](https://router.vuejs.org/zh/api/#router-addroutes)  
3、使用`router.getRoutes`读取路由 [文档](https://router.vuejs.org/zh/api/#router-addroute-2)  
4、注销的时候，把路由重置到登陆前的数据。

## 注意点
* 路由版本：` "vue-router": "^3.2.0",`
* **官方已经废弃了`addRoutes`**
* 目前应该使用`addRoute`!!!

![image.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/214f29293a494a75a014ab57c322a633~tplv-k3u1fbpfcp-watermark.image)
* 获取路由函数`router.getRoutes()`返回的数组不会有层级，会把子路由提到最外面一层。


## 核心代码介绍

```js
//模拟后端传的路由
export const authRouter = [
  {
    path: '/allSeePage',
    name: '所有人可见',
    component: 'allSeePage' //后面我们使用require([`@/views/${view}`], resolve) 进行动态加载
  },
  {
    path: '/adminPage',
    name: '管理员可见',
    component: 'adminPage'
  }
]
``` 

> 我把`登陆`、`注销`、`添加路由`、方法都放在`vuex`内了
### 1、state
```js
  state: {
    userInfo: {
      userName: '',
      password: '',
      token: '',
      routerList: [] //存放后端返回的路由列表
    }
  },
```

### 2、vuex内添加路由方法 ADD_ROUTE
`vuex-mutaions`
```js
mutations: {
    ADD_ROUTE(state) {
      let routerList = JSON.parse(JSON.stringify(state.userInfo.routerList))
      console.log(26, router.getRoutes().length)
      //路由未添加之前是4个,添加完之后是6个，我们用是否小于6个，来判断是否要添加
      if (router.getRoutes().length < 6) {
        routerList = filterAsyncRouter(routerList)//路由动态添加
        console.log('路由添加前', router.getRoutes())
        routerList.forEach((i) => {
          //在home父路由内添加子路由
          router.addRoute('home', i)
        })
        console.log('路由添加后', router.getRoutes())
      }
    }
}
```

### 2、登陆
> 主要就是读取登陆接口路由，然后把路由添加进去
* `vuex`

```js
 state: {
    userInfo: {
      userName: '',
      password: '',
      token: '',
      routerList: [],//当前登陆用户的路由列表-由后端传过来
    }
 },
mutations: {
    SET_USER_INFO(state, val) {
      state.userInfo = Object.assign(state.userInfo, val)
    }
  },
actions: {
    //登陆
    login({ commit }, userInfo) {
      const { userName, password } = userInfo
      return new Promise((resolve) => {
        //模拟登陆，获取用户信息， 权限路由列表
        //假设返回的有token, 路由列表(根据不同用户返回不同)
        /**********************模拟后端传过来的路由列表----S***********************/
        let routerList = []
        if (userName === 'admin') {
          routerList = authRouter
        } else if (userName === 'commonUser') {
          routerList = [authRouter[0]]
        }
        /**********************模拟后端传过来的路由列表----E***********************/
        let token = 'testToken'
        //把用户信息存入vuex
        commit('SET_USER_INFO', {
          userName,
          password,
          token,
          routerList
        })
        //添加路由
        commit('ADD_ROUTE')
        resolve()
      })
    },
}
```  
### 3、注销
`vuex-actions`
```js
actions:{
    //注销
    logout({ commit, state }) {
      return new Promise((resolve) => {
        console.log(state.userInfo.token, '注销了')
        commit('SET_USER_INFO', {
          userName: '',
          password: '',
          token: ''
        })
        //重置路由
        resetRouter() //这是路由里面的重置方法，引入的
        resolve()
      })
    },
}
```
### 4、渲染菜单
> 利用`router.getRoutes()`,获取已经添加的路由，此方法会把所有层级变为一层，子路由会有parent属性  
> 最后渲染到页面上
在左侧导航组件内
```js
      let routeList = this.$router.getRoutes()
      //查找home路由的子路由，然后渲染出来
      this.menuList = routeList.filter(
        (i) => i.parent && i.parent.name === 'home'
      )
```

* 重置路由方法
  `permission.js`

```js
//路由的创建
const createRouter = () =>
  new VueRouter({
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })
  //重置路由
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export const router = createRouter()

``` 

## 路由钩子函数`beforeEach`
> 流程

![image.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/64edd6bc3d4d4e2bbbe7ae66563228ce~tplv-k3u1fbpfcp-watermark.image)

>代码

```js
router.beforeEach(async (to, from, next) => {
  //获取用户信息
  let { userInfo } = store.state
  const { userName } = userInfo
  console.log('用户角色', userName ? userName : '未登陆')
  //有用户信息
  if (userName) {
    await store.dispatch('addRoute')
    let { routerList } = userInfo
    //根据to.name来判断是否为动态路由, 是否有人知道还有更好的判断方法？
    if (!to.name) {
      //当前路由是动态的，确定是有的, 有就跳自己，没有就跳404
      if (routerList.findIndex((i) => i.path === to.path) !== -1) {
        next({ ...to, replace: true })
      } else {
        next('/404')
      }
    } else {
      next()
    }
  }
  //无用户信息
  else {
    //没有权限访问，跳入没有权限页面/或者登陆页面
    // 跳转之前要判断一下是否为需要跳转的界面，不然会进入死循环
    if (to.path === '/login') {
      next()
    } else {
      Message.error('请先登陆！')
      next('/login')
    }
  }
})
```

## 路由动态`component`引入

```js
export const loadView = (view) => {
  // 路由懒加载
  return (resolve) => require([`@/views/${view}`], resolve)
}
```

## 遇到的坑
1、在`vue-route:3x`版本内，废弃了`router.addRoutes`,而是使用`router.addRoute`,注意没有`s`  
2、`router.getRoutes`获取的路由层级只有一层！不会出现子路由，子路由会有`parent`属性。  
3、永远不要使用`this.$router.options.routes`来获取路由，因为动态修改路由这里面不会变化，真的是坑啊！！  
4、路由f5刷新后,之前动态添加的路由都会丢失。。      
5、404页面，钩子函数内进行判断就好。 不要写这句 `{ path: '*', redirect: '/404' }`

[可以参考花裤衩大佬的提问](https://github.com/vuejs/vue-router/issues/1859)

## 写在最后
* 代码内可能有Bug，希望可以在仓库[issues](https://github.com/zhoufanglu/dynamic-vue-router)提出
* 在`beforeEach`判断是否为动态路由那是否有更好的解决方式？
* [代码地址](https://github.com/zhoufanglu/dynamic-vue-router)
* 感谢阅读✿
