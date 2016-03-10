import $ from 'jquery'
import Listener from './Listener'

export default class Drag {
	constructor(dom) {
		this.dom = dom
		this.init()
	}

	init() {
		$(this.dom).addClass('drag')
		Listener(this.dom, 'mousedown', this.mouseDown)
		Listener(this.dom, 'mousemove', this.mouseMove)
	}

	mouseDown(e) {
		console.log(e)
		console.log(this)
		this._X = e.clientX
		this._Y = e.clientY
		this.left = $(this.dom).css('left')
		this.top = $(this.dom).css('top')
		console.log(this.left,this.top	)
	}

	mouseMove(e) {
		console.log(this, e,  this.left, this.top)
		$(this.dom).css('left', this.left + e.clientX - this._X )
	}
}