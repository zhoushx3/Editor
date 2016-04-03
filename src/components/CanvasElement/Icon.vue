<template lang="jade">
	wrapper(:element="element", :key="key", :selectid="selectid") 
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
		props: ['key', 'element', 'selectid'],
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
		}
	}
</script>