import net from "net"

class ProPresenter {
	constructor() {
		this.client = new net.Socket()
		this.eventListeners = {}
	}
	connect(ip, port) {
		this.client = new net.Socket()

		this.client.connect(port, ip, () => this._triggerEvent("connect"))

		this.client.on("data", data => this._handleData(JSON.parse(data)))

		this.client.on("close", () => this._triggerEvent("disconnect"))

		this.client.on("error", error => this._triggerEvent("error", error))
	}
	disconnect() {
		this.client.destroy()
	}
	on(event, callback) {
		this.eventListeners[event] = callback

		if (event != "connect" && event != "disconnect" && event != "error") {
			this._registerStatusUpdate(event)
		}
	}
	send(event, method, body) {
		let jsonData = {
			url: `v1/${event}`,
		}

		if (method) jsonData.method = method.toUpperCase().trim()
		if (body) jsonData.body = body

		this.client.write(JSON.stringify(jsonData) + "\n")
	}
	_handleData(res) {
		let url = res.url
		let urlMain = url?.split("/").splice(1).join("/")

		this._triggerEvent(urlMain, res.data)
	}
	_triggerEvent(event, data) {
		if (this.eventListeners[event]) {
			this.eventListeners[event](data)
		}
	}
	_registerStatusUpdate(event) {
		this.client.write(
			JSON.stringify({
				url: `v1/${event}`,
				chunked: true,
			}) + "\n"
		)
	}
}

export default ProPresenter
