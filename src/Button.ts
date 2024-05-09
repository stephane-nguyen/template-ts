import { Context } from "./Context";
import { Time } from "./Time";

export class Button {
  protected element: HTMLButtonElement;
  protected watchContainer: HTMLDivElement;
  private buttonStrategy?: ButtonStrategy;

  constructor(
    watchContainer: HTMLDivElement,
    textContent: string,
    buttonStrategy?: ButtonStrategy
  ) {
    this.buttonStrategy = buttonStrategy;
    this.watchContainer = watchContainer;
    this.element = document.createElement("button");
    this.element.textContent = textContent;
    this.element.addEventListener("click", this.press.bind(this));
    this.watchContainer.appendChild(this.element);
  }

  private press() {
    this.buttonStrategy?.press();
  }

  getElement(): HTMLButtonElement {
    return this.element;
  }
}

export class ModeButton extends Button {
  private buttonState: ButtonState;
  private timeSpan: HTMLSpanElement;
  private time: Time;
  private hasBeenClickedOnce = false;
  private resetButton?: Button;

  constructor(watchContainer: HTMLDivElement, timeSpan: HTMLSpanElement, time: Time) {
    super(watchContainer, "Mode");
    this.buttonState = new NothingState();
    this.timeSpan = timeSpan;
    this.time = time;
    this.element.addEventListener("click", this.onClick.bind(this));
  }

  private onClick() {
    if (!this.hasBeenClickedOnce) {
      this.createResetButtonIfNotCreated();
      this.hasBeenClickedOnce = true;
    }
    this.buttonState.changeState(this);
  }

  private createResetButtonIfNotCreated() {
    if (!this.resetButton) {
      this.resetButton = new Button(
        this.watchContainer,
        "Reset",
        new ResetStrategy(this.timeSpan, this.time, this)
      );
      this.resetButton.getElement().addEventListener("click", this.onResetButtonClick.bind(this));
    }
  }

  private onResetButtonClick() {
    if (this.resetButton) {
      this.resetButton.getElement().remove();
      this.resetButton = undefined;
      this.hasBeenClickedOnce = false;
    }
  }

  setState(state: ButtonState) {
    this.buttonState = state;
  }

  getState(): ButtonState {
    return this.buttonState;
  }
}

export class IncreaseButton extends Button {
  private modeButton: ModeButton;
  private time: Time;

  constructor(watchContainer: HTMLDivElement, modeButton: ModeButton, time: Time) {
    super(watchContainer, "Increase");
    this.modeButton = modeButton;
    this.time = time;
    this.element.addEventListener("click", this.onClick.bind(this));
  }

  private onClick() {
    this.increaseTime();
  }

  private increaseTime() {
    const modeState = this.modeButton.getState();

    if (modeState instanceof HourState) {
      this.time.setHour(this.time.getHour() + 1);
    } else if (modeState instanceof MinuteState) {
      this.time.setMinute(this.time.getMinute() + 1);
    }

    console.log("Updated time:", this.time.toString());
  }
}

interface ButtonState {
  changeState(button: ModeButton): void;
}

export class NothingState implements ButtonState {
  changeState(button: ModeButton): void {
    if (button.getState() instanceof NothingState) {
      button.setState(new HourState());
      console.log("Changed state to: Hour");
    }
  }
}

class HourState implements ButtonState {
  changeState(button: ModeButton): void {
    if (button.getState() instanceof HourState) {
      button.setState(new MinuteState());
      console.log("Changed state to: Minute");
    }
  }
}

class MinuteState implements ButtonState {
  changeState(button: ModeButton): void {
    if (button.getState() instanceof MinuteState) {
      button.setState(new NothingState());
      console.log("Changed state to: Nothing");
    }
  }
}

interface ButtonStrategy {
  press(): void;
}

export class LightStrategy implements ButtonStrategy {
  private timeSpan: HTMLSpanElement;

  constructor(timeSpan: HTMLSpanElement) {
    this.timeSpan = timeSpan;
  }

  press(): void {
    if (this.timeSpan.style.backgroundColor === "yellow") {
      this.timeSpan.style.backgroundColor = "";
    } else {
      this.timeSpan.style.backgroundColor = "yellow";
    }
  }
}

export class ResetStrategy implements ButtonStrategy {
  private timeSpan: HTMLSpanElement;
  private time: Time;
  private modeButton: ModeButton;

  constructor(timeSpan: HTMLSpanElement, time: Time, modeButton: ModeButton) {
    this.timeSpan = timeSpan;
    this.time = time;
    this.modeButton = modeButton;
  }

  press(): void {
    this.modeButton.setState(new NothingState());
    this.time.reset();
    this.timeSpan.textContent = this.time.toString();
  }
}

export class CreateWatchStrategy implements ButtonStrategy {
  press(): Context {
    return new Context("Europe/Paris");
  }
}

export class ChangeDisplayStrategy implements ButtonStrategy {
  press(): void {
    console.log("Change display button pressed.");
  }
}
