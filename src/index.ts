import "./index.css";
import { Context } from "./Context";
import { Button } from "./Button/Button";
import { TimeZoneUtils } from "./Time/TimeZoneUtils";
import { CreateWatchStrategy } from "./Button/ButtonStrategy";

const timeZoneUtils = new TimeZoneUtils();

const container = document.createElement("div");
document.body.appendChild(container);

timeZoneUtils.populateTimezonesInSelectBar();

document
  .getElementById("timezoneSelect")
  .addEventListener("change", timeZoneUtils.getSelectedTimezoneInSelectBar);

const createWatchButton = new Button(
  container,
  "Create watch",
  new CreateWatchStrategy(() => timeZoneUtils.getSelectedTimezoneInSelectBar())
);

const contextGM = new Context("Europe/Paris");
const contextGMTPlus1 = new Context("Europe/London");
const contextGMTPlus2 = new Context("Australia/Melbourne");
const contextGMTPlus3 = new Context("America/New_York");
