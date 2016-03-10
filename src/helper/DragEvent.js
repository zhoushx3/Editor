import Listener from './Listener.js'

/*
	DragEvent: 监听元素拖拽
*/
export default class DragEvent {
	/*
		@ dragCB    -> mousemove回调的操作
		@ dragUpCB  -> mouseup 回调
		@ container -> 负责监听的容器，避免使用document
		@ target    -> 负责存储监听的元素，可多个，至少点击其中一个可以触发集体移动
		@ clientXY    -> 存放点击时鼠标的位置
	*/
	constructor(dragCB, dragUpCB, container) {
		this.dragCB = dragCB
		this.dragUpCB = dragUpCB
		this.container = container
		this.target = []
		this.clientXY = []
		this.targetMouseDown = false
		this.init()
	}

	init() {
		let self = this

		Listener(this.container, 'mouseup', (event)=>{
			self.target.length = 0
			self.clientXY.length = 0
			self.targetMouseDown = false

			if ( !!self.target && self.dragUpCB) {
				self.dragUpCB()
			}
		})

		Listener(this.container, 'mousemove', (event)=>{
			if ( self.targetMouseDown ) {
				let clientX = event.clientX,
						clientY = event.clientY,
						delX = clientX - self.clientXY[0],
						delY = clientY - self.clientXY[1]

				self.clientXY = [clientX, clientY]

				self.target.forEach( (ele)=>{
					self.dragCB(ele, delX, delY)
				})
			}
		})
	}

	// 注册监听拖拽的元素，并通知可以触发拖拽
	trigger(key, clientX, clientY) {
		this.register(key, clientX, clientY)
		this.targetMouseDown = true
	}
	// 注册监听拖拽的元素
	register(key, clientX, clientY) {
		// 过滤掉 FlexEvent
		if ( key.indexOf('d_') !== 0) {
			return
		}

		this.clientXY = [clientX, clientY]

		if ( this.target.indexOf(key) === -1 ) {
			this.target.push(key)
		}

	}
	// 取消监听
	unregister(key) {
		let pos = this.target.indexOf(key)
		this.target.splice(pos, 1)
	}
}