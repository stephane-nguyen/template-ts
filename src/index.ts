import "./index.css";
import { Context } from "./Context";
import { Button, CreateWatchStrategy } from "./Button";
import { TimeUtils } from "./TimeUtils";

const timeUtils = new TimeUtils();

const container = document.createElement("div");
document.body.appendChild(container);

timeUtils.populateTimezonesInSelectBar();

document
  .getElementById("timezoneSelect")
  .addEventListener("change", timeUtils.getSelectedTimezoneInSelectBar);

const createWatchButton = new Button(
  container,
  "Create watch",
  new CreateWatchStrategy(() => timeUtils.getSelectedTimezoneInSelectBar())
);

const contextGM = new Context("Europe/Paris");
const contextGMTPlus1 = new Context("Europe/London");
const contextGMTPlus2 = new Context("Australia/Melbourne");
const contextGMTPlus3 = new Context("America/New_York");
