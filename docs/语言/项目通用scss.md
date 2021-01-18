---
autoGroup-css: css  
title: '项目通用scss'
categories: 语言
tags: [css, webpack]
--- 
 
<Meta/>  
 ```css
 @charset "UTF-8";
 @mixin vertical-center { // 垂直水平居中
   display: flex;
   align-items: center;
   justify-content: center;
 }
 
 @mixin ellipsis($line){ // 超出行显示...
   display: -webkit-box;
   -webkit-box-orient: vertical;
   -webkit-line-clamp: $line;
   overflow: hidden;
 }
 
 @mixin panel{ // panel
   border-radius: 6px;
   padding: 20px;
   background-color: #ffffff;
 }
 
 @mixin panel-item{ //项目里面的块 一个阴影块
   box-sizing: border-box;
   margin-bottom: 20px;
   padding: 14px;
   background-color: #FFF;
   box-shadow: 0 0 2px 0 rgba(0,0,0,.1);
   border: 1px solid #f1f0f5;
   border-radius: 2px;
 }
 
 //底部1px的实现
 @mixin border-1px-bottom($color) {
   position: relative;
   // 用于伪类的定位
   &:before{
     content: "";
     position: absolute;
     left: 0;
     top: 0;
     width: 200%;
     border-bottom:1px solid $color;
     color: $color;
     height: 200%;
     -webkit-transform-origin: left top;
     transform-origin: left top;
     -webkit-transform: scale(0.5);
     transform: scale(0.5);
     pointer-events: none; /* 防止点击触发 */
     box-sizing: border-box;
     @media screen and (min-device-pixel-ratio:3),(-webkit-min-device-pixel-ratio:3){
       width: 300%;
       height: 300%;
       -webkit-transform: scale(0.33);
       transform: scale(0.33);
     }
   }
 }
 //基本的行 带三角，带虚线下划线，分左右两边对齐
 @mixin base-row{
   height: 100px;
   display: flex;
   justify-content: space-between;
   align-items: center;
   //padding: 0 20px;
   @include border-1px-bottom($light);
   &:before{
     border-bottom:1px dashed $light;
   }
 }
 
 @mixin boxShadow(){
   box-shadow: 1px 2px 10px 0px rgba(0, 0, 0, .1);
 }
 
 @mixin border-1px-all($color,$radius) {
   position: relative;
   // 用于伪类的定位
   &:before{
     content: "";
     position: absolute;
     left: 0;
     top: 0;
     width: 200%;
     border:1px solid $color;
     border-radius: $radius!important;
     color: $color;
     height: 200%;
     -webkit-transform-origin: left top;
     transform-origin: left top;
     -webkit-transform: scale(0.5);
     transform: scale(0.5);
     pointer-events: none; /* 防止点击触发 */
     box-sizing: border-box;
     @media screen and (min-device-pixel-ratio:3),(-webkit-min-device-pixel-ratio:3){
       width: 300%;
       height: 300%;
       -webkit-transform: scale(0.33);
       transform: scale(0.33);
     }
   }
 }
 //一些简单文案
 @mixin text{
   font-size: 28px;
   letter-spacing: 3px;
   color: #B4B4B4;
   span{
     //font-weight: bolder;
   }
 }
 //正常黑色标题
 @mixin title{
   font-size: $titleSize;
   font-weight: bolder;
   color: #505050;
 }
 
 //一般正常按钮
 @mixin button-theme($width){
   width: $width;
   height: 84px;
   @include vertical-center;
   font-size: 32px;
   color: #FFF200FF!important;
   font-weight: 500;
   background-color: $theme;
   border-radius: 44px;
   box-shadow: 2px 4px 20px 0 rgba(0, 0, 0, .3);
 }
 
 
 @font-face {
   font-family: 'iconfont';  /* project id 2081768 */
   src: url('//at.alicdn.com/t/font_2081768_va9xgt1kxnr.eot');
   src: url('//at.alicdn.com/t/font_2081768_va9xgt1kxnr.eot?#iefix') format('embedded-opentype'),
   url('//at.alicdn.com/t/font_2081768_va9xgt1kxnr.woff2') format('woff2'),
   url('//at.alicdn.com/t/font_2081768_va9xgt1kxnr.woff') format('woff'),
   url('//at.alicdn.com/t/font_2081768_va9xgt1kxnr.ttf') format('truetype'),
   url('//at.alicdn.com/t/font_2081768_va9xgt1kxnr.svg#iconfont') format('svg');
 }
 .iconfont{
   font-family:"iconfont" !important;
   font-size:16px;font-style:normal;
   -webkit-font-smoothing: antialiased;
   -webkit-text-stroke-width: 0.2px;
   -moz-osx-font-smoothing: grayscale;}
 
 
 //css 打点
 .dot {
   &::before{
     content: '...';
     position: absolute;
     animation: dot2 3s infinite step-start both;
   }
   &:after{
     content: '...';
     color: transparent;
   }
 }
 @keyframes dot2 {
   33% { content: '.';}
   66% { content: '..';}
 }
 
 //元素动画渐变效果， 背景变化
 @mixin domTransition {
   transition: all 0.2s ease-in-out 0s; /* 常用的简写方式 */
 }
 
 //元素缩放
 @mixin scale($size) {
   -webkit-transform: scale($size);
   -moz-transform: scale($size);
   -o-transform: scale($size);
   transform: scale($size);
 }
 //类似进度条加载动画
 @mixin progressLoading(){
   animation: slideWidth 1s;
   @keyframes slideWidth {
     0% {
       width: 0;
     }
     10% {
       width: 10%;
     }
     20% {
       width: 20%;
     }
     30% {
       width: 30%;
     }
     40% {
       width: 40%;
     }
     50% {
       width: 50%;
     }
     60% {
       width: 60%;
     }
     70% {
       width: 70%;
     }
     80% {
       width: 80%;
     }
     90% {
       width: 90%;
     }
     100% {
       width: 100%;
     }
   }
 }
 
 //媒体查询变量
 $lg: 'screen and (min-width: 1500px)';
 $md: 'screen and (max-width: 1499px) and (min-width: 100px)';
 
 
 @mixin mq($mqString) {
   @media #{$mqString} {
     @content;
   }
 }
 
 //提示色
 $positive: #3399ff;
 $danger: #fe575c;
 $warning: #ffe002;
 $balanced: #8ad350;
 $calm: #00aaaf;
 ```