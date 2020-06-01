const nav = require("./nav.js"); // 引入刚刚生成的文件
module.exports = {
  title: 'lufangzhou的代码日记',
  description: 'hexo之后的技术blog',
  base: '/vuepressBlog/',
  head: [
    ['link',{rel:'icon',href:'/img/favicon.ico'}]
  ],
  markdown: {
    lineNumbers: true // 代码块显示行号
  },
  plugins: {
    "vuepress-plugin-auto-sidebar": {
      nav: true, //自动生成顶部nav  这里没用
      collapsable: true,
      titleMap: {
        "exampleSubMenu1": "🎉 Hello Vuepress 🎉",
      }
    }
  },

  themeConfig: {
    //sidebarDepth: 3, // e'b将同时提取markdown中h2 和 h3 标题，显示在侧边栏上。
    lastUpdated: 'Last Updated', // 文档更新时间：每个文件git最后提交的时间
    displayAllHeaders: false, // 默认值：false 设置为true来显示所有页面的标题链接：
    algolia: {
      apiKey: '<API_KEY>',
      indexName: '<INDEX_NAME>'
    },
    //nav,
    nav: [
      { text: '首页', link: '/' },
      {
        text: '语言',
        items: [
          { text: 'javascript', link: '/javascript/'},
          { text: '框架', link: '/框架/'},
          { text: 'example', link: '/exampleMenu1/'},
        ],
      },
      {
        text: '个人主页',
        items: [
          { text: '掘金', link: 'https://juejin.im/user/5afd39c36fb9a07ac162a318' },
          { text: 'GitHub', link: 'https://github.com/zhoufanglu'},
          { text: 'hexo', link: 'https://zhoufanglu.github.io/'},
        ]
      },
    ],
    /*sidebar: {
      '/code/': [
        ['/code/javascript/对象操作.md', '对象操作'],
        ['/code/javascript/深浅拷贝.md', '深浅拷贝'],
      ]
    }*/
  }
}