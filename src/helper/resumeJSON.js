
export default class resumeJSON {
	constructor() {
		this.json = {}
	}

	init() {
		return new Promise( (resolve, reject) => {
			$.ajax({
				type: 'get',
				url: 'build/data.json',
				success: (json)=>{
					this.json = json
					resolve(json)
				},
				fail: (err)=>{
					reject(err)
				}
			})
		})
	}

	getJSON() {
		return this.json
	}

	readFromFile() {

	}

	writeToFile() {

	}
}