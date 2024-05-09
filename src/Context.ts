import { ModeButton, IncreaseButton, Button, LightStrategy } from "./Button";
import { Time } from "./Time";

export class Context {
  private modeButton: ModeButton;
  private increaseButton: IncreaseButton;
  private lightButton: Button;

  private timeContainer: HTMLDivElement;
  private timeSpan: HTMLSpanElement;

  private intervalId: NodeJS.Timeout;

  private time: Time;

  constructor() {
    this.timeContainer = document.createElement("div");
    const timeSpan = document.createElement("span");
    this.timeContainer.appendChild(timeSpan);
    this.timeSpan = timeSpan;
    document.body.appendChild(this.timeContainer);

    this.time = new Time();

    this.modeButton = new ModeButton();
    this.increaseButton = new IncreaseButton(this.modeButton, this.time);
    this.lightButton = new Button("Light", new LightStrategy(timeSpan));

    this.intervalId = setInterval(() => this.updateTimeText(), this.time.oneSecond());
  }

  private updateTimeText() {
    this.time.tick();
    this.timeSpan.textContent = this.time.toString();
  }
}
