import "./index.css";
import { Watch } from "./Watch";
import { Button } from "./Button/Button";
import { TimeZoneUtils } from "./Time/TimeZoneUtils";
import { CreateWatchStrategy } from "./Button/ButtonStrategy";
import { Vector2D } from "./Geometry";

const timeZoneUtils = new TimeZoneUtils();

timeZoneUtils.populateTimezonesInSelectBar();

document
  .getElementById("timezoneSelect")
  .addEventListener("change", timeZoneUtils.getSelectedTimezoneInSelectBar);

const container = document.createElement("div");
document.body.appendChild(container);
const createWatchButton = new Button(
  container,
  "Create watch",
  new CreateWatchStrategy(() => timeZoneUtils.getSelectedTimezoneInSelectBar())
);

export const randomPoint = Vector2D.generateRandomPoint();
const randomPointDiv = randomPoint.generateUI(randomPoint, "red");
document.body.appendChild(randomPointDiv);

const WatchGM = new Watch("Europe/Paris");
const WatchGMTPlus1 = new Watch("Europe/London");
const WatchGMTPlus2 = new Watch("Australia/Melbourne");
const WatchGMTPlus3 = new Watch("America/New_York");
