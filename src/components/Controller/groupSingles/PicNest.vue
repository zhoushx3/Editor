<template lang="jade">
	#pic-nest
</template>

<style lang="less" scoped>
	
</style>

<script>
	export default {
		name: 'pic-nest',
		props: ['display'],
		data() {
			return {
			}
		},
		computed: {
		},
		methods: {
		},
		components: {
		},
		watch: {
		},
		ready: function() {
      $('#pic-nest').niceScroll({
        cursorcolor: '#d6d6d6',
        railalign: 'right',
        horizrailenabled: false,
        cursoropacitymin:0,
        autohidemode: false
      })
		}
	}
</script>