import fakeData from '../data/fakeData.js'
import Event from './Event.js'

const JSON_DATA = 'JSON_DATA'

class Store {
	/*
		@ json 		 : 项目数据
		@ selectid : 选中的元素的id
		@ selectElement : 选中的元素
	*/	
	constructor() {
		// 初始化应该从用户的项目数据里读取，暂时是读取fake数据
		window.store = this
		this.json = fakeData
		this.selectid = undefined
		this.selectElement = this.selectid === undefined ? undefined : this.json.content[this.selectid]
	}

	fetchJson() {
		Event.emitChange(JSON_DATA, this.json, this.selectid, this.selectElement)
	}

	setPageIndex(index) {
		this.pageIndex = index
		this.selectid = undefined
		this.fetchJson()
	}
	// 更新画布上选中的元素ID
	resetElementId(id) {
		// 直接复制与set有什么区别？为了添加callback?
		this.selectid = id
		this.selectElement = id === undefined ? undefined : this.json.content[id]
		this.fetchJson()
	}
	// 修改当前选中的 element 
	setElement(newElement) {
		this.json.content[this.selectid] = newElement
		this.selectElement = newElement
		this.fetchJson()
	}

	addElement(newElement, isGroup) {
		// isGroup 指明是否来源为模板
		// 这样赋值才能让 Vue 将其转为响应的, 下面的删除也是
		// 这里不能使用Store.content来操作，否则json.content还是保持原来的(指针)
		// 模板元素中的zIndex保持不变
		let contentNum = ( this.json.contentNum += 1 )
		if (!isGroup) newElement['style']['zIndex'] = contentNum

		this.json.content = Object.assign({}, this.json.content, {
			[ contentNum ]: newElement
		})
		this.selectid = contentNum
		this.selectElement = this.json.content[this.selectid]
		if (!isGroup) this.fetchJson()
	}

	deleteElement(key) {
		delete this.json.content[key]
		this.json.content = Object.assign({}, this.json.content)
		this.resetElementId(undefined)
	}

	// 添加组合模板
	addGroupModule(json) {
		if ( typeof json !== 'object')
			return
		for (let i in json) {
			this.addElement(json[i], true)
		}
		this.fetchJson()
	}
}

export default new Store()