<template lang="jade">
	#icon-nest.animated(:class="class")
		.icon-container
			.icon(v-for="icon in iconFont" 
						@dblclick.stop.prevent="selectIcon(icon.fontclass)")
				div.iconfont(:class="icon.fontclass")
		p.warning ! 双击选择
		img.return(:src="returnImg", alt="返回" @click="returnTo")
</template>

<style lang="less" scoped>
	@import '../../../less/variable.less';

	#icon-nest {
  	position: absolute;
  	top: 0;
  	bottom: 0;
  	left: 0;
  	right: 0;
  	background-color: #fff;
  	overflow-x: hidden;
  	overflow-y: auto;
  	z-index: @nest-zIndex;

  	.icon-container {
  		width: 100%;
			display: flex;
	  	justify-content: space-around;
			align-items: flex-start;
			align-content: flex-start;
	  	flex-wrap: wrap;

	  	.icon {
	  		width: 50px;
	  		height: 50px;
	  		margin: 10px;
		  	.iconfont {
				  font-size: 42px;
				  color: #FF4040;
				  transition: transform 0.25s ease-out 0s;
				  &:hover{
					  // font-size: 100px;
					  transform: scale(1.7)
					}
		  	}
		  }
  	}

  	.warning {
  		color: #f00;
  		font-size: 12px;
  		margin: 10px;
  	}

  	.return {
  		position: absolute;
  		bottom: 10px;
  		left: 50%;
  		width: 30px;
  		margin-left: -15px;
  		cursor: pointer;
  	}
	}
</style>
<script>
	import iconFont from '../../../data/iconFont.js'
	import ElementAction from '../../../Action2Store/ElementAction.js'

	export default {
		name: 'icon-nest',
		props: ['class'],
		data() {
			return {
				returnImg: 'src/assets/img/return.png',
				iconFont: iconFont
			}
		},
		computed: {
		},
		methods: {
			selectIcon(icon) {
				this.$dispatch(ADD_ELEMENT, 'icon', icon)
			},
			returnTo() {
				// 修改props 双向
				this.class = "bounceOutLeft"
			}
		},
		components: {
		},
		watch: {
		},
		ready: function() {
      $('#icon-nest').niceScroll({
        cursorcolor: '#d6d6d6',
        railalign: 'right',
        horizrailenabled: false,
        cursoropacitymin:0,
        autohidemode: false
      })
		}
	}
</script>