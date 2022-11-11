import ViLike from 'vilike'
import Bmob from "hydrogen-js-sdk/dist/Bmob-2.2.4.min";
// import Sakana from 'sakana';
// 使用异步函数也是可以的
export default ({
                  Vue, // VuePress 正在使用的 Vue 构造函数
                  options, // 附加到根实例的一些选项
                  router, // 当前应用的路由实例
                  siteData, // 站点元数据
                  //isServer // 当前应用配置是处于 服务端渲染 或 客户端
                }) => {
  // ...做一些其他的应用级别的优化
  /*Vue.mixin({
    mounted() {
      if(!document.querySelector('#sakanaElement')){
        const el = document.createElement('div')
        el.id = 'sakanaElement'
        el.style.cssText = `position: fixed;right: 0;bottom: 0;transform-origin: 100% 100%;`;
        document.body.appendChild(el);
        console.log('创建了', document.querySelector('#sakanaElement'))
        Sakana.init({
          el,
          scale: .5
        })
      }else {
        // console.log('1', document.querySelector('#sakanaElement'))
      }
    }
  })*/
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

