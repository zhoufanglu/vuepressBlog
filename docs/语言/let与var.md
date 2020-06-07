---
autoGroup-javascript: javascript  
title: let与var
--- 
## var&let与闭包  
* var
```js
    function test() { 
      var arr = []
      for(var i = 0; i < 10; i++){ //作用域1
        arr[i] = function () { //作用域2
            return i 
        }
      }
      console.log(18, i) //在这里的时候 i的值已经是10了
      for(var j=0; j<10;j++){
        console.log(arr[j]())  //这里访问的i已经是10
      }
    }
    test()
``` 

* let  

```js
    function test() {
      var arr = []
      for(let i = 0; i < 10; i++){ //每次循环都是单独的块级作用域，let每次定义都是在块级内声明有效，而var是在方法内有效
        arr[i] = function () { //每次都会访问上级的作用域，就是for循环内的的作用域，每次i都有一个新的值
            return i
        }
      }
      //console.log(18, i) //在这里的时候，由于i是块级作用域，访问不到了。
      for(var j=0; j<10;j++){
        console.log(arr[j]())  //进入arr[i]的方法内，每次i都是独立的
      }
    }
    test()
```