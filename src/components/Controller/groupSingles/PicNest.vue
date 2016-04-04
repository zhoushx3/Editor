<template lang="jade">
	#pic-nest.animated(:class="class")
		.pic-container
			a(href="javascript:;", class="file", @click="openFile") 选择文件
				input(type="file", accept="image/jpeg, image/png", @change="uploadFile")
		p.warning ! 双击选择
		img.return(:src="returnImg", alt="返回" @click="returnTo")
</template>

<style lang="less" scoped>
	@import '../../../less/variable.less';

	#pic-nest {
  	position: absolute;
  	top: 0;
  	bottom: 0;
  	left: 0;
  	right: 0;
  	background-color: #ECECEC;
  	overflow-x: hidden;
  	overflow-y: auto;
  	z-index: @nest-zIndex;

  	.pic-container {
  		width: 100%;
			display: flex;
	  	justify-content: space-around;
			align-items: flex-start;
			align-content: flex-start;
	  	flex-wrap: wrap;

	  	.file {
		    position: relative;
		    display: inline-block;
		    background: #D0EEFF;
		    border: 1px solid #99D3F5;
		    border-radius: 4px;
		    padding: 4px 12px;
		    color: #1E88C7;
		    line-height: 20px;

				&:hover {
				    background: #AADFFD;
				    border-color: #78C3F3;
				    color: #004974;
				    text-decoration: none;
				}
				input {
			    display: none;
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
	import EditorAction from '../../../Action2Store/EditorAction.js'

	export default {
		name: 'pic-nest',
		props: ['class'],
		data() {
			return {
				returnImg: 'src/assets/img/return.png',
			}
		},
		computed: {
		},
		methods: {
			mouseenter: function(event) {
				$(event.target).addClass('rubberBand')
			},
			mouseleave: function(event) {
				$(event.target).removeClass('rubberBand')
			},
			selectShape(shape) {
				// EditorAction.addElement('geometric', shape)
			},
			returnTo() {
				// 修改props 双向
				this.class = "bounceOutLeft"
			},
			openFile() {
				$(this.$el).find('input').click()
			},
			uploadFile(event) {
				let files = event.target.files
				if (!files.length) return 
				let file = files[0]
				if (!this.checkFile(file.name)) return


			},
			checkFile(f) {
				// 依靠file.type是不准确的，有时候type == ''
				let type = f.substr(f.lastIndexOf('.')+1).toLowerCase()
				console.log(type)
				return ['jpg', 'jpeg', 'png'].indexOf(type) !== -1
			}
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