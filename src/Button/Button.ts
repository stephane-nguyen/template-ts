import { Time } from "../Time/Time";
import { ButtonState, HourState, MinuteState, NothingState } from "./ButtonState";
import { ButtonStrategy, ResetStrategy } from "./ButtonStrategy";

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
  private time: Time;
  private hasBeenClickedOnce = false;
  private resetButton?: Button;

  constructor(watchContainer: HTMLDivElement, time: Time) {
    super(watchContainer, "Mode");
    this.buttonState = new NothingState();
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
        new ResetStrategy(this.time, this)
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
      this.time.incrementHour();
    } else if (modeState instanceof MinuteState) {
      this.time.incrementMinute();
    }

    console.log("Updated time:", this.time.toString());
  }
}
