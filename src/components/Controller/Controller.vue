<template lang="jade">
	.controller 
		template(v-if="!selectKey")
			h2 点击画布上的元素
		template(v-else)
			font(:element="content[selectKey]" v-if="showFontController")
			color(:element="content[selectKey]" v-if="showColorController")
			scale(:element="content[selectKey]" v-if="showScaleController")
			flex(:element="content[selectKey]" v-if="showFlexController")

</template>

<style lang="less">
	.controller {
		position: absolute;
		top: 30px;
		bottom: 0;
		right: 0;
		width: 300px;
		border-left: 1px solid #000;
	}
</style>


<script>
	import Font from './font.vue'
	import Color from './Color.vue'
	import Scale from './Scale.vue'
	import Flex from './Flex.vue'

	export default {
		name: 'controller',
		props: ['content', 'selectKey'],
		data() {
			return {
			}
		},
		computed: {
			showColorController() {
				let type = ['icon', 'text', 'geometric', 'background']
				return type.indexOf(this.content[this.selectKey]['type']) !== -1
			},
			showFontController() {
				let type = ['text']
				return type.indexOf(this.content[this.selectKey]['type']) !== -1
			},
			showScaleController() {
				let type = ['geometric', 'icon']
				return type.indexOf(this.content[this.selectKey]['type']) !== -1
			},
			showFlexController() {
				let type = ['text', 'img']
				return type.indexOf(this.content[this.selectKey]['type']) !== -1
			}
		},
		components: {
			'font': Font,
			'color': Color,
			'scale': Scale,
			'flex': Flex
		},
		ready() {
			console.log(this.selectKey)
		}
	}

</script>