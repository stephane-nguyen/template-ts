import { Time } from "./Time";

export class Button {
  protected element: HTMLButtonElement;
  private buttonStrategy?: ButtonStrategy;

  constructor(textContent: string, buttonStrategy?: ButtonStrategy) {
    this.element = document.createElement("button");
    this.element.textContent = textContent;
    this.element.addEventListener("click", this.press.bind(this));
    document.body.appendChild(this.element);
    this.buttonStrategy = buttonStrategy;
  }

  private press() {
    this.buttonStrategy?.press();
  }
}

export class ModeButton extends Button {
  private buttonState: ButtonState;

  constructor() {
    super("Mode");
    this.buttonState = new NothingState();
    this.element.addEventListener("click", this.onClick.bind(this));
  }

  private onClick() {
    this.buttonState.changeState(this);
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

  constructor(modeButton: ModeButton, time: Time) {
    super("Increase");
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

class NothingState implements ButtonState {
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

class ResetStrategy implements ButtonStrategy {
  press(): void {
    console.log("Reset button pressed.");
  }
}

class ChangeDisplayStrategy implements ButtonStrategy {
  press(): void {
    console.log("Change display button pressed.");
  }
}
