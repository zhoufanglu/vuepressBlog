---
autoGroup-vue: vue
title: vue-一些技巧
--- 
<Meta/>  

## 1、element组件内闭包传参
```html
<el-switch
    @change="(isVisible) => switchHandle(isVisible, customVal)"
    v-model="visible"
>
</el-switch>
```