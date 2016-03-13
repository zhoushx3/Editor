import resumeJSON from './resumeJSON.js'

export const ADD_ELEMENT = 'add_element'

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
	}
}