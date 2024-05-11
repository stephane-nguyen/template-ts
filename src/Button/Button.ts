import { Time } from "../Time/Time";
import { Watch } from "../Watch";
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
  private watch: Watch;
  private time: Time;
  private hasBeenClickedOnce = false;
  private resetButton?: Button;

  constructor(watchContainer: HTMLDivElement, watch: Watch, time: Time) {
    super(watchContainer, "Mode");
    this.time = time;
    this.watch = watch;
    this.element.addEventListener("click", this.onClick.bind(this));
  }

  private onClick() {
    if (!this.hasBeenClickedOnce) {
      this.createResetButtonIfNotCreated();
      this.hasBeenClickedOnce = true;
    }
    this.watch.getState().changeState();
  }

  private createResetButtonIfNotCreated() {
    if (!this.resetButton) {
      this.resetButton = new Button(
        this.watchContainer,
        "Reset",
        new ResetStrategy(this.time, this.watch)
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
}

export class IncreaseButton extends Button {
  private watch: Watch;
  private time: Time;

  constructor(watchContainer: HTMLDivElement, watch: Watch, time: Time) {
    super(watchContainer, "Increase");
    this.element.addEventListener("click", this.onClick.bind(this));
    this.watch = watch;
    this.time = time;
  }

  private onClick() {
    this.watch.getState().handleClick(this.time);
  }
}
