# ProPresenter-TCP
An extremely simple wrapper for the ProPresenter TCP API.
For documentation, visit [https://openapi.propresenter.com/](https://openapi.propresenter.com/)
### Example
```js
import ProPresenter from "./propresenter.js"

const pro = new ProPresenter()

const ip = "127.0.0.1" // IP address of the device you're connecting to, or 127.0.0.1 for local
const port = 1026 // TCP port for ProPresenter (configured in ProPresenter settings)

pro.connect(ip, port)

pro.on("connect", () => console.log("Connected to ProPresenter"))
pro.on("disconnect", () => console.log("Disconnected from ProPresenter"))
pro.on("error", (error) => console.error(error))

// when the slide changes
pro.on("status/slide", (data) => {
    console.log(data.current.uuid) // log the current slide ID

    pro.send("trigger/next") // send a get request to advance the slide
    
    pro.send("stage/message", "PUT", "new things") // send a put request to change the stage message
})
```