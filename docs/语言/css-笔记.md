---
autoGroup-css: css  
title: 'css开发笔记'
--- 
<Meta/> 
 
## css 翻转
```css
transform: rotateY(180deg); /*水平翻转*/
transform: rotateX(180deg); /*垂直翻转*/
```
## 阴影
```scss
box-shadow: 1px 2px 10px 0 rgba(0, 0, 0, .1);
box-shadow:#06A480 0 0 10px;//四周
```
## 子元素不占位置
父级 relative 子级 absolute

## css 缩放
```css
-webkit-transform: scale(0.7);
-moz-transform: scale(0.7);
-o-transform: scale(0.7);
transform: scale(0.7);

```

## flex 布局自动换行
```css
flex-flow: row wrap;
```

## 打点 loading...
![3687e6347746e13f89a17d962583c543.png](en-resource://database/400:1)


## text两端对齐
```css
.justify-text {
	li {
		margin-top: 5px;
		padding: 0 20px;
		width: 100px;
		height: 40px;
		background-color: $red;
		line-height: 40px;
		text-align-last: justify;
		color: #fff;
		&:first-child {
			margin-top: 0;
		}
	}
}
```

## 定位垂直居中
```html
<div class='content'>
        <div class='panel'></div>
</div>
```
```css
.content{
    position:absolute;
    width:100%;
    heigiht:100%;
    .panel{
        width:200px;
        height:100px;
        position:relative;
        top:50%
        left:50%;
        margin:-50px -100px 0 0;
    }
}
```

## div换行自适应布局
* 加个content
```css
.out-link-panel{ 
    display: flex;  
    flex-direction: row;   
    flex-flow: row wrap;   
    margin-top: 10px;   
    margin-bottom: 30px;   
    justify-content: space-between;    
    &:after{     
    content:"";        
    width: 130px;    
    margin-right: 20px;  
    }
}


```

## 表头定位
```css
th{
    position:sticky;
    top:0
}
```

## radius
```css
border-bottom-right-radius: 20px 20px;

border-radius:18px 18px 0px 0px;

```

## 上下滑动走马灯
[参考](https://codepen.io/lilyH/pen/CjrHl/)


## vue绑定style背景图片
```css
:style="{   background:'url('+$path + i.back_imgurl +')',   'background-size':'cover'}"

:style="{'background-color':i.cnName==='还空'?'#2d8cf0':''}"

```

## css全部灰色实现
```css
-webkit-filter: grayscale(100%)
```

## div下图片白框
[参考](https://www.jianshu.com/p/2af064692505)
```css
    img{
        display:block
    }
``` 


## css 背景图片与背景颜色共存 

```css
background: url("../assets/img/home_arc.png") 
no-repeat;background-size: contain;
background-position: bottom;
background-color: $theme;
```

## 伪类的详细用法
[伪类](
http://jimyuan.github.io/blog/2018/01/05/content-property-of-pseudo-element.html)

## 让点击失效
```css
pointer-events: none;
```

## pading后盒子撑大问题
```css
box-sizing:border-box
```

## fixed之后的元素定位居中
```css
position:fixed;
margin:0 auto;
left:0;
right:0;
//新方法
left: 50%;
transform: translate(-50%, -50%);

```
## flex 布局问题
1、子元素宽度设置无效问题,设置缩放为0
```js
flex-shrink: 0
```
## vw,vh
* 100vw 宽度为设备宽度的100%
* 100vh 高度为设备高度的100%

## 文字颜色渐变
```css
color: #32a946 !important;background-image: -webkit-gradient(linear, left top, 
right top, color-stop(0.2, #32a946), color-stop(0.7, 
#0973ba));

```

## 平滑动画
```css
transition: all 0.3s ease;

```

## 背景图片蒙层
```css 
&:before{    content: "";    display: block;    position: absolute;    top: 0px;    left: 0px;    width: 100%;    height: 100%;    background: rgba(0,0,0,0.2);}


```

## video 全屏
```css
object-fit: fill;
```
## css 特殊梯形
[参考](
https://blog.csdn.net/dmtnewtons/article/details/41146485)

## animate.css 循环动画 
```html
<div class=" animated flip   test">sdasdasdsa</div>
<!---控制animated class类的显示与不显示->
``` 

```css
animation-duration: 2s;/*持续时间*/
animation-delay: 2s; /*等待几秒后开始动画*/
animation-iteration-count: infinite; /*重复动画*/

```
## 奇数偶数选择器
```css
p:nth-child(odd){} //奇数行p:
nth-child(even){} //偶数行
``` 

## flex与overflow:scroll冲突问题
```css

https://blog.csdn.net/dongcehao/article/details/79655717
```

## keyframes 动画过渡
* 是基于父元素的
```css

animation: slideWidth 1s;@keyframes slideWidth {    0% {        width: 0;    }    10% {        width: 10%;    }    20% {        width: 20%;    }    30% {        width: 30%;    }    40% {        width: 40%;    }    50% {        width: 50%;    }    60% {        width: 60%;    }    70% {        width: 70%;    }    80% {        width: 80%;    }    90% {        width: 90%;    }    100% {        width: 100%;    }}

``` 

## flex 一行列表对齐
[参考](
https://www.zhangxinxu.com/wordpress/2019/08/css-flex-last-align/?tdsourcetag=s_pctim_aiomsg)

## rem用法
[参考](
https://juejin.im/post/5a716c4c6fb9a01cb42cac4b)

## 滚动条不占位置
overflow-y: overlay;

## flex 表格  
```scss
.panel >div{ /*行*/
            display: flex;
        }
        span{  /*item*/
            flex: 1;
            overflow-wrap: break-word;
            overflow: hidden;
            word-wrap: break-word;
            border: solid 1px red;
        }
```