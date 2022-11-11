<template>
	<div class="sakana-box"></div>
</template>

<script>
export default {
	name: 'Sakana',
	data() {
		return {
			sakana: null
		}
	},
	mounted() {
		const src = 'https://cdn.jsdelivr.net/npm/sakana';
		this.init(src)
	},
	beforeDestroy() {

	},
	methods: {
		async init(src) {
			await this.loadJs(src);
			this.initSakana()
		},

		loadJs(src) {
			return new Promise((resolve, reject) => {
				let script = document.createElement('script');
				script.type = "text/javascript";
				script.src = src;
				document.body.appendChild(script);
				script.onload = () => {
					console.log('ok');
					resolve();
				}
				script.onerror = () => {
					reject();
				}
			})
		},

		initSakana() {
			window.sakana = this.sakana = Sakana.init({
				// 选项: 默认值
				el: '.sakana-box',     // 启动元素 node 或 选择器
				character,
				inertia,
				decay,
				r,
				y,
				scale,
				translateY,
				canSwitchCharacter,
				onSwitchCharacter(character) {  // 切换角色回调
					console.log(`${character} dayo~`);
				},
			});
		}
	}
}
</script>

<style lang="stylus" scoped>
html .sakana-box{
  position: fixed;
  right: 0;
  bottom: 0;
  transform-origin: 100% 100%; /* 从右下开始变换 */
}
</style>
