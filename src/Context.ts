import { ModeButton, IncreaseButton } from "./Button";
import { Time } from "./Time";

export class Context {
  private modeButton: ModeButton;
  private increaseButton: IncreaseButton;

  private lightOn: boolean;

  private timeText: HTMLDivElement;
  private intervalId: NodeJS.Timeout;

  private time: Time;

  constructor() {
    this.lightOn = false;
    this.modeButton = new ModeButton();
    this.time = new Time();
    this.increaseButton = new IncreaseButton(this.modeButton, this.time);

    this.timeText = document.createElement("div");
    document.body.appendChild(this.timeText);

    this.intervalId = setInterval(() => this.updateTimeText(), this.time.oneSecond());
  }

  private updateTimeText() {
    this.time.tick();
    const timeString = this.time.toString();
    this.timeText.textContent = timeString;
  }
}
