import { GrandMA2 } from "grandma2";
import { XTouchCompactMidiController } from "midiabstract";

var ma2 = new GrandMA2("10.1.1.1", "remote", "remote", [])
var xt = new XTouchCompactMidiController()

// console.log(xt.textButtons["buttonA"].button.event_emitter)
xt.textButtons["buttonA"].button.event_emitter.on("press", () => {ma2.decreasePage()});
xt.textButtons["buttonB"].button.event_emitter.on("press", () => {ma2.increasePage()});

xt.faders.forEach((fader, index) => {
    fader.fader.event_emitter.on("value", (value) => {ma2.setExecFaderValue(index + 1, value)})
})

ma2.on("executerFaderChanged", (e) => {
    e.map((item) => {
        let id = item.executerNumber;
        xt.faders[id - 1].motor.set(item.executerBlock.fader.value)
        xt.buttons[1][id - 1].lamp.set(item.executerBlock.button3.state)
        xt.buttons[2][id - 1].lamp.set(item.executerBlock.button2.state)
        xt.buttons[3][id - 1].lamp.set(item.executerBlock.button1.state)
    })
})
