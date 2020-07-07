---
autoGroup-javascript: javascript  
title: String
--- 

## 声明方式
* 给爷给整懵逼了
* 记住对象之间不可比较
```js
     var s1 = 'a'
     var s2 = new String('a')
     var s3 = new Object('a')
     console.log('-类型判断-')
     console.log(13, judgeCate(s1)) //String
     console.log(13, judgeCate(s2)) //String
     console.log(13, judgeCate(s3)) //String
     console.log('-值-')
     console.log(s1) //a
     console.log(s2)// String {'a'}
     console.log(s3)// String {'a'}
     console.log('-==判断-')
     console.log(s1 == s2) //true
     console.log(s1 == s3) //true
     console.log('--')
     console.log(s1 === s2) //false
     console.log(s1 === s3) //false
     console.log('-===判断-')
     console.log(s2 == s3) //false
     console.log(s2 != s3) //true
```