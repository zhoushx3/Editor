
class resumeJSON {
	constructor() {
		this.json = {}
	}

	init(vm) {
		this.vm = vm
		return new Promise( (resolve, reject) => {
			$.ajax({
				type: 'get',
				url: 'build/data.json',
				success: (json)=>{
					this.json = json
					resolve(true)
				},
				fail: (err)=>{
					reject(false)
				}
			})
		})
	}

	getContent() {
		return this.json.content
	}

	readFromFile() {

	}

	writeToFile() {

	}
}

export default new resumeJSON()