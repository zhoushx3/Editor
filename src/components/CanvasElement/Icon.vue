<template lang="jade">
	wrapper(:element="element", :key="key", :selectId="selectId") 
		div(:style="element.style", :class="['iconfont', element.className]")
</template>

<style lang="less" scoped>
	.iconfont {
		font-size: 42px;
	  color: #FF4040;
	}
</style>
	
<script>
	import Wrapper from '../Wrapper.vue'

	export default {
		name: 'icon-component',
		props: ['key', 'element', 'selectId'],
		data() {
			return {
			}
		},
		computed: {
		},
		watch: {
		},
		methods: {
		},
		components: {
			'wrapper': Wrapper,
		},
		ready: function() {
			console.log('icon is ready')

		}
	}
</script>