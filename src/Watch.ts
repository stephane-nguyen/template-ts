import { ModeButton, IncreaseButton, Button } from "./Button/Button";
import { ButtonState, NothingState } from "./Button/ButtonState";
import { LightStrategy, ChangeTimeFormatStrategy } from "./Button/ButtonStrategy";
import { Time } from "./Time/Time";

export class Watch {
  private state: ButtonState;

  private modeButton: ModeButton;
  private increaseButton: IncreaseButton;
  private lightButton: Button;
  private resetButton: Button;
  private changeTimeFormatButton: Button;

  private watchContainer: HTMLDivElement;
  private timeSpan: HTMLSpanElement;

  private intervalId: NodeJS.Timeout;

  private time: Time;

  constructor(timezone: string) {
    this.watchContainer = document.createElement("div");
    this.timeSpan = document.createElement("span");
    this.watchContainer.appendChild(this.timeSpan);
    document.body.appendChild(this.watchContainer);

    this.state = new NothingState(this);

    this.time = new Time(timezone);

    this.modeButton = new ModeButton(this.watchContainer, this, this.time);
    this.increaseButton = new IncreaseButton(this.watchContainer, this, this.time);
    this.lightButton = new Button(this.watchContainer, "Light", new LightStrategy(this.timeSpan));
    this.changeTimeFormatButton = new Button(
      this.watchContainer,
      "Change time format",
      new ChangeTimeFormatStrategy(this.time)
    );

    this.intervalId = setInterval(() => this.updateTimeText(), this.time.oneSecond());
  }

  private updateTimeText() {
    this.time.tick();
    this.timeSpan.textContent = this.time.toString();
  }

  public getState() {
    return this.state;
  }

  public setState(state: ButtonState) {
    this.state = state;
  }
}
