import { ModeButton, IncreaseButton, Button, LightStrategy } from "./Button";
import { Time } from "./Time";

export class Context {
  private modeButton: ModeButton;
  private increaseButton: IncreaseButton;
  private lightButton: Button;
  private resetButton: Button;

  private watchContainer: HTMLDivElement;
  private timeSpan: HTMLSpanElement;

  private intervalId: NodeJS.Timeout;

  private time: Time;

  constructor(timezone: string) {
    this.watchContainer = document.createElement("div");
    this.timeSpan = document.createElement("span");
    this.watchContainer.appendChild(this.timeSpan);
    document.body.appendChild(this.watchContainer);

    this.time = new Time(timezone);

    this.modeButton = new ModeButton(this.watchContainer, this.timeSpan, this.time);
    this.increaseButton = new IncreaseButton(this.watchContainer, this.modeButton, this.time);
    this.lightButton = new Button(this.watchContainer, "Light", new LightStrategy(this.timeSpan));
    this.intervalId = setInterval(() => this.updateTimeText(), this.time.oneSecond());
  }

  private updateTimeText() {
    this.time.tick();
    this.timeSpan.textContent = this.time.toString();
  }
}
