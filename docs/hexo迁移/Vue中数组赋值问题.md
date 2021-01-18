---
title: Vue中数组赋值问题
date: 2019-02-15 09:58:17
tags: [vue]
categories: 框架
---

<meta name="referrer" content="no-referrer" />


### 出现的问题
<font face="微软雅黑" size=3>昨天工作内遇到的问题，用输入arrList渲染了一个表格，修改了arrList，然而列表没有改变。</font>
<font face="微软雅黑" size=3>Vue 不是双向绑定吗？怎么回事？what's fuck 值变了? 列表没有变？？？</font>
#### 测试代码
``` javascript
    //Vue中列表渲染的数据是这样的,单价和数量
    renderData:[
            {perPrice: 1, number: 10},
            {perPrice: 1, number: 20},
            {perPrice: 1, number: 30},
          ]
```

``` html
  html 就不写了，反正就是列表渲染
```

<font face="微软雅黑" size=3>效果如下</font>
![渲染效果图](https://github.com/zhoufanglu/markdownPhoto/blob/master/hexo/render1.png?raw=true)

<font face="微软雅黑" size=3>我给还原按钮写了个事件，点击修改renderData</font>


``` javascript
//还原按钮的点击事件
resetData(){
      this.renderData[0] = {perPrice: 1, number: 10}
      this.renderData.length = 1
    }
```
<font face="微软雅黑" size=3>点击还原，列表毫无反应，我明明改变了数组的值，还有他的长度。</font>

### 解决
<font face="微软雅黑" size=3>最后阅读了Vue的[官方文档](https://cn.vuejs.org/v2/guide/list.html#%E5%AF%B9%E8%B1%A1%E6%9B%B4%E6%94%B9%E6%A3%80%E6%B5%8B%E6%B3%A8%E6%84%8F%E4%BA%8B%E9%A1%B9/" 百度一下")，找到了答案</font>
<font face="微软雅黑" size=3>由于 JavaScript 的限制，Vue 不能检测刚刚的数组修改操作</font>
#### 代码修改
``` javascript
//还原按钮的点击事件
resetData(){
          this.$set(this.renderData,0,{perPrice: 1, number: 10})
          this.renderData.splice(1)
          console.log(this.renderData);
        }
```
<font face="微软雅黑" size=3>效果如下</font>
![渲染效果图](https://github.com/zhoufanglu/markdownPhoto/blob/master/hexo/render2.png?raw=true)






