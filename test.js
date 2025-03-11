import ProPresenter from "./propresenter.js"

let ip = "127.0.0.1"
let port = 1026 // TCP port for ProPresenter (configured in ProPresenter settings)

let pro = new ProPresenter()
// https://openapi.propresenter.com/

pro.connect(ip, port)

pro.on("connect", () => console.log("Connected to ProPresenter"))
pro.on("disconnect", () => console.log("Disconnected from ProPresenter"))
pro.on("error", (error) => console.error(error))

// when the slide changes, send a get request to advance the slide and a put request to change the stage message
pro.on("status/slide", (data) => {
    console.log(data.current.uuid)
    setTimeout(() => {
        pro.send("trigger/next") // send a get request to advance the slide
        pro.send("stage/message", "PUT", "new things") // send a put request to change the stage message
    }, 2000)
})