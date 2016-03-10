<template lang="jade">
	.elementList
		template(v-for="d in content")
			li(@click="toggleHook($key)")
				.hook {{ hook[$key] ? 'O' : '' }}
				span {{ d.type === "text" ? d.text : d.alt }}
</template>

<style lang="less">
	.elementList {
		position: absolute;
		top: 30px;
		bottom: 0;
		left: 0;
		width: 300px;
		border-right: 1px solid #000;

		li {
			cursor: pointer;
			height: 20px;
			line-height: 20px;

			.hook	{
				display: inline-block;
				width: 20px;
				height: 20px;
				border: 1px solid #aaa;
				margin: 0 10px;
				vertical-align: middle;
				text-align: center;
			}

			span {
				width: 12em;
				display: inline-block;
				white-space: nowrap;
				text-overflow:ellipsis;
				overflow: hidden;
				vertical-align: middle;
			}
		}

	}
</style>


<script>
	export default {
		name: 'elementList',
		props: ['content'],
		data() {
			return {
				hook: []
			}
		},
		watch: {
		},
		methods: {
			toggleHook: function(key) {
				this.hook.$set(key, this.hook[key] ? 0 : 1)
				if (this.hook[key] === 1) {
					window.dragEvent.register('d_' + key, undefined, undefined)
				} else {
					window.dragEvent.unregister('d_' + key)
				}
			}
		},
		ready() {

		}
	}

</script>