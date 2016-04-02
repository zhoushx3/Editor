<template lang="jade">
	.elementList
		template(v-for="d in content")
			li(@click="toggleHook($key)")
				.hook {{ hook[$key] ? 'O' : '' }}
				span {{ d.type === "text" ? d.text : d.alt }}
		.add-element(@click="toggleShow") {{ show ? '收起' : '添加' }}
		//- element-container(v-bind:class="animateClass")
</template>

<style lang="less" scoped>
	@import '../less/variable.less';

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

		.add-element {
			width: 70px;
	    font-size: 12px;
	    position: absolute;
	    bottom: 0;
	    right: 0;
	    height: 30px;
	    line-height: 30px;
	    text-align: center;
	    background-color: #404040;
	    color: #fff;
	    cursor: pointer;
	    z-index: @add-element-zIndex;
		}

	}
</style>


<script>
	// import ElementContainer from './ElementContainer.vue'

	export default {
		name: 'elementList',
		props: ['content'],
		data() {
			/* 
				hook: 是否选中，打勾
				show: 是否显示元素选择板块 
			*/
			return {
				hook: [],
				show: false,
				// animateClass: 'hidden',
				animateClass: 'bounceInLeft'
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
			},
			toggleShow: function() {
				// 这种写法是为了初始化 animateClass 为''，接下来则在另外两个值里切换
				this.animateClass = this.animateClass === 'bounceInLeft' ? 'bounceOutLeft' : 'bounceInLeft'
				this.show = !this.show
			}
		},
		components: {
			// 'element-container': ElementContainer
		},
		ready() {

		}
	}

</script>