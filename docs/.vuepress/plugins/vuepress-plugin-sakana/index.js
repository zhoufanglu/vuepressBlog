const { resolve } = require('path')

module.exports = (options, context) => ({
	define() {
		const { character, inertia, decay, r, y, scale, translateY, canSwitchCharacter } = options
		return {
			character: character || 'takina',          // 启动角色 'chisato','takina' 
			inertia: inertia || 0.01,              // 惯性
			decay: decay || 0.99,              // 衰减
			r: r || 60,                // 启动角度
			y: y || 10,                // 启动高度
			scale: scale || 0.5,                 // 缩放倍数
			translateY: translateY || 0,                 // 位移高度
			canSwitchCharacter: canSwitchCharacter || false,     // 允许换角色
		}
	},
	name: 'vuepress-plugin-sakana',
	enhanceAppFiles: resolve(__dirname, './bin/enhanceAppFile.js'),
	globalUIComponents: 'Sakana'
})
