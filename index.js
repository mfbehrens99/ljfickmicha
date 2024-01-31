import { GrandMA2 } from "grandma2";
import { XTouchCompactMidiController } from "midiabstract";
const ma2 = new GrandMA2("10.1.1.1", "remote", "remote", ["fader","button"], 8, 1, 5, 101)
var xt = new XTouchCompactMidiController()

// console.log(xt.textButtons["buttonA"].button.event_emitter)
xt.textButtons["buttonA"].button.event_emitter.on("press", () => {ma2.decreasePage('faderPage')});
xt.textButtons["buttonB"].button.event_emitter.on("press", () => {ma2.increasePage('faderPage')});

xt.faders.forEach((fader, index) => {
    fader.fader.event_emitter.on("value", (value) => {
        console.log(value)
        ma2.setExecFaderValue(index + 1, value)
        })
})


ma2.on("executorFaderChanged", (e) => {
    console.log("change")
    //console.log(JSON.stringify(e))
    e[0].map((item) => {
        console.log(JSON.stringify(item))
        let id = item.executorNumber;
        xt.faders[id - 1].motor.set(item.executorBlocks[0].fader.value)
        xt.buttons[1][id - 1].lamp.set(item.executorBlocks[0].button3.state)
        xt.buttons[2][id - 1].lamp.set(item.executorBlocks[0].button2.state)
        xt.buttons[3][id - 1].lamp.set(item.executorBlocks[0].button1.state)
    })
})

