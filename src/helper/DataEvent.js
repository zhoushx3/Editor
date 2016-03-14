import resumeJSON from './resumeJSON.js'

export const ADD_ELEMENT = 'add_element'
export const SELECT_ELEMENT = 'select_element'

function geometricTemplate(c) {
	return {
		"type": "geometric",
		"className": c,
		"style": {
			"top": '0',
			"left": "10px"
		},
	}
}


// 由 Editor.vue 调用
export default {
	/*
		添加画布元素
		@type -> geometric / icon / img / text
		@c    -> the className or 
	*/
	[ADD_ELEMENT]: function(type, c) {
		resumeJSON.json.contentNum += 1

		switch (type) {
			case 'geometric':
				// 这样赋值才能让 Vue 将其转为响应的
				this.content = Object.assign({}, this.content, {
					[ resumeJSON.json.contentNum ]: geometricTemplate(c)
				})
			break
		}
	},
	/*
		选择画布元素并在右侧显示对应工具
		@key: json.content中的键即id
	*/
	[SELECT_ELEMENT]: function(key) {
		this.selectKey = key
	}
}