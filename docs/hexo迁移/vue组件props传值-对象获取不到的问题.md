---
title: 'vue组件props传值,对象获取不到的问题'
date: 2019-06-05 18:47:34
tags: [Vue]
categories: Vue
---

<meta name="referrer" content="no-referrer" />


&nbsp;&nbsp;&nbsp;&nbsp;先说问题，父组件利用props向子组件传值，浏览器`console`有这个值，但是获取不到内部的属性，困了我3个小时，真的**
* 父组件定义了`personal`这个值。在父组件接口中给这个值重新赋值。
* 子组件接受这个值,浏览器`console`能看到这个值，但是取不到属性的值。


---
**以下为原代码**
#### home.vue（父组件）--personal是被传的参数

```html
<!--子组件-->
<form-picker class="form-picker"
  :personal="personal"
>
</form-picker>
```
```js
export default {
    data(){
        return{
            personal:{
                state:'',////判断是修改状态，还是新增状态  add/edit
                data:[]
            }
        }
    },
    mounted(){
      this.$api.personal.searchPersonalInfo(this.userInfo.userId).then((res)=>{
          this.personal.data = res.data.data //这里给personal对象赋值接口传来的数据
        })
    },
}


```

#### formPicker （子组件） --接收personal

```js
export default {
    props:['active','personal'],
    mounted(){
        console.log(149,this.personal)
        console.log(150,this.personal.state)
    }
}
```
**运行结果**

![结果](https://user-gold-cdn.xitu.io/2019/6/5/16b2727449e534d1?w=535&h=278&f=png&s=23702)

**<font color="red">明明149行有`state`值，150行输出却没有了,是不是超级奇怪</font>**

* 后面经过大佬的讲解，其实浏览器console.log也是应该没有的
![缓存问题](https://user-gold-cdn.xitu.io/2019/6/5/16b272c27bf8805d?w=481&h=338&f=png&s=21202)
* 所以，其实我们子组件一开始根本就没有取到这个personal这个对象。

#### 解决方法--使用watch
父组件
```js
export default {
    data(){
        return{
            personal:{
                state:'',////判断是修改状态，还是新增状态  add/edit
                data:[]
            }
        }
    },
    mounted(){
      this.$api.personal.searchPersonalInfo(this.userInfo.userId).then((res)=>{
          //this.personal.data = res.data.data //这里给personal对象赋值接口传来的数据
          //使用以下方法重新赋值，上面方法watch监听不到，具体什么原因，我也不清楚，知道的告知我！谢谢
          this.personal = {
            data: res.data.data,
            state: 'edit'
          }
        })
    },
}
```
接下来子组件就能`watch`到`personal`了
子组件
```js
watch:{
      personal(newValue,oldValue){
        console.log(181,newValue)
      },
/** 输出
        {
            data: res.data.data,
            state: 'edit'
          }
**/
    }
```