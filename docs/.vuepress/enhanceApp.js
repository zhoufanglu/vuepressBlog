import ViLike from 'vilike'
import Bmob from "hydrogen-js-sdk/dist/Bmob-2.2.4.min";
// 使用异步函数也是可以的
export default ({
                  Vue, // VuePress 正在使用的 Vue 构造函数
                  options, // 附加到根实例的一些选项
                  router, // 当前应用的路由实例
                  siteData, // 站点元数据
                  //isServer // 当前应用配置是处于 服务端渲染 或 客户端
                }) => {
  // ...做一些其他的应用级别的优化
  Vue.use(ViLike)
}
// 请自行修改相关配置信息
ViLike.configure({
  secretKey: '20a6032320a10448',
  safeKey: '761715',
  table: 'vuepress',
  key: 'skey',
  visit: 'visit',
  like: 'like'
});
// 初始化
ViLike.init();
/**********************Sakana***********************/
import Sakana from 'sakana';

// 创建 DOM
const el = document.createElement('div');
// 设定样式放置到右下角
el.style.cssText = `position: fixed;right: 0;bottom: 0;transform-origin: 100% 100%;`;

// 放到 body 里
document.body.appendChild(el);

Sakana.init({
  el:         el,     // 启动元素 node 或 选择器
  scale:      .5,                // 缩放倍数
  canSwitchCharacter: true,      // 允许换角色
});
