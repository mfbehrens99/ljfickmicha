import { GrandMA2 } from "grandma2";
import { XTouchCompactMidiController } from "midiabstract";

var ma2 = new GrandMA2("10.1.1.1", "remote", "remote", [])
var xt = new XTouchCompactMidiController()

xt.named_buttons["buttonA"].event_emitter.on("press", () => {ma2.decreasePage()});
xt.named_buttons["buttonB"].event_emitter.on("press", () => {ma2.increasePage()});
