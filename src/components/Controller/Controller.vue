<template lang="jade">
	.controller 
		template(v-if="!selectKey")
			h2 点击画布上的元素
		template(v-else)
			// font(:element="content[selectKey]")
			color(:element="content[selectKey]" v-if="showColorController")


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

	export default {
		name: 'controller',
		props: ['content', 'selectKey'],
		data() {
			return {
			}
		},
		computed: {
			showColorController() {
				let type = ['icon', 'text', 'geomestry', 'background']
				return type.indexOf(this.content[this.selectKey]['type']) !== -1
			}
		},
		components: {
			'font': Font,
			'color': Color,
		},
		ready() {
			console.log(this.selectKey)
		}
	}

</script>