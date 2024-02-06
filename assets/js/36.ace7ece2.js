(window.webpackJsonp=window.webpackJsonp||[]).push([[36],{608:function(t,e,a){"use strict";a.r(e);var r=a(3),s=Object(r.a)({},(function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("ContentSlotsDistributor",{attrs:{"slot-key":t.$parent.slotKey}},[a("meta",{attrs:{name:"referrer",content:"no-referrer"}}),t._v(" "),a("h2",{attrs:{id:"背景"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#背景"}},[t._v("#")]),t._v(" 背景")]),t._v(" "),a("p",[t._v("项目做完了,感觉反应有点慢，无意中看到了分包。打算对项目进行分包。")]),t._v(" "),a("p",[a("strong",[t._v("版本")]),t._v(" "),a("code",[t._v("mpvue:2.0")]),t._v(" "),a("code",[t._v('mpvue-entry: "^2.0.0-rc.9"')])]),t._v(" "),a("h2",{attrs:{id:"微信小程序分包"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#微信小程序分包"}},[t._v("#")]),t._v(" 微信小程序分包")]),t._v(" "),a("p",[t._v("微信小程序上线有限制")]),t._v(" "),a("ul",[a("li",[t._v("整个小程序所有分包大小不超过 8M")]),t._v(" "),a("li",[t._v("单个分包/主包大小不能超过 2M")])]),t._v(" "),a("p",[t._v("所以进行分包，分包好处")]),t._v(" "),a("div",{staticClass:"language- extra-class"},[a("pre",[a("code",[t._v("1、首次启动时，先下载小程序主包，显示主包内的页面\n\n2、如果用户进入了某个分包的页面，再下载这个对应分包，下载完毕后，显示分包的页面。\n")])])]),a("h2",{attrs:{id:"插件mpvue-entry"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#插件mpvue-entry"}},[t._v("#")]),t._v(" 插件"),a("code",[t._v("mpvue-entry")])]),t._v(" "),a("p",[t._v("github地址--"),a("a",{attrs:{href:"https://github.com/F-loat/mpvue-entry#%E5%8F%82%E6%95%B0",target:"_blank",rel:"noopener noreferrer"}},[t._v("mpvue-entry"),a("OutboundLink")],1),t._v("\n目的是把每个"),a("code",[t._v("page")]),t._v("页面下的"),a("code",[t._v("main.js")]),t._v(" 抽离出来\n"),a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/7/25/16c287162e1bdae2?w=917&h=518&f=png&s=115230",alt:""}})]),t._v(" "),a("h3",{attrs:{id:"a、新项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#a、新项目"}},[t._v("#")]),t._v(" a、新项目")]),t._v(" "),a("p",[t._v("如果你还没有新建项目，可以利用"),a("code",[t._v("vue init F-loat/mpvue-quickstart my-project")]),t._v(" 初始化一个项目。")]),t._v(" "),a("div",{staticClass:"language-node line-numbers-mode"},[a("pre",{pre:!0,attrs:{class:"language-text"}},[a("code",[t._v("vue init F-loat/mpvue-quickstart my-project  //新建项目\n")])]),t._v(" "),a("div",{staticClass:"line-numbers-wrapper"},[a("span",{staticClass:"line-number"},[t._v("1")]),a("br")])]),a("h3",{attrs:{id:"b、已新建好mpvue项目"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#b、已新建好mpvue项目"}},[t._v("#")]),t._v(" b、已新建好mpvue项目")]),t._v(" "),a("p",[t._v("直接修改webpack(a方案也要修改webpack)\n具体如何修改： 参考"),a("a",{attrs:{href:"https://github.com/F-loat/mpvue-entry#%E5%8F%82%E6%95%B0",target:"_blank",rel:"noopener noreferrer"}},[t._v("mpvue-entry"),a("OutboundLink")],1)]),t._v(" "),a("p",[a("font",{attrs:{color:"red"}},[a("strong",[t._v("注意点：")])])],1),t._v(" "),a("ol",[a("li",[a("p",[t._v("原本mpvue建的项目，pages目录页面下会有"),a("code",[t._v("main.js")]),t._v("&"),a("code",[t._v("main.json")]),t._v("&"),a("code",[t._v("xxx.vue")]),t._v("三个文件，使用"),a("code",[t._v("mpvue-entry")]),t._v("后，就不需要"),a("code",[t._v("main.js")]),t._v("和"),a("code",[t._v("main.json")]),t._v("文件（可删除）。\n"),a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/7/25/16c2869f97105ecc?w=441&h=107&f=png&s=5930",alt:"图片"}})])]),t._v(" "),a("li",[a("p",[t._v("在"),a("code",[t._v("main.js")]),t._v("中把不是公用的代码用"),a("code",[t._v("app-only")]),t._v("注释掉,把不是每个"),a("code",[t._v("page")]),t._v("页面需要用到的代码给注释掉。\n"),a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/7/25/16c286a8523204ef?w=738&h=307&f=png&s=24943",alt:""}})])]),t._v(" "),a("li",[a("p",[t._v("在"),a("code",[t._v("main.js")]),t._v("中定义Vue对象的时候要注入App对象。\n"),a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/7/25/16c286e0e13261cf?w=950&h=570&f=png&s=55442",alt:""}})])])]),t._v(" "),a("h3",{attrs:{id:"最后附上-app-json-和目录"}},[a("a",{staticClass:"header-anchor",attrs:{href:"#最后附上-app-json-和目录"}},[t._v("#")]),t._v(" 最后附上 "),a("code",[t._v("app.json")]),t._v(" 和目录")]),t._v(" "),a("p",[a("code",[t._v("app.json")]),t._v(" "),a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/7/25/16c286ea2725c739?w=518&h=313&f=png&s=19364",alt:""}})]),t._v(" "),a("p",[t._v("目录")]),t._v(" "),a("p",[a("img",{attrs:{src:"https://user-gold-cdn.xitu.io/2019/7/25/16c28700bb2b5e29?w=268&h=319&f=png&s=12919",alt:""}})])])}),[],!1,null,null,null);e.default=s.exports}}]);