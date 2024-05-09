import "./index.css";
import { Context } from "./Context";
import { Button, CreateWatchStrategy } from "./Button";

// API to get all timezone : http://worldtimeapi.org/api/timezone
// Check http://worldtimeapi.org/pages/examples
const container = document.createElement("div");
document.body.appendChild(container);

const createWatchButton = new Button(container, "Create watch", new CreateWatchStrategy());

const contextGM = new Context("Europe/Paris");
const contextGMTPlus1 = new Context("Europe/London");
const contextGMTPlus2 = new Context("Australia/Melbourne");
const contextGMTPlus3 = new Context("America/New_York");
