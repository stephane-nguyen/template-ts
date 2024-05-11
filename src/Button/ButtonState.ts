import { ModeButton } from "./Button";

export interface ButtonState {
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

export class HourState implements ButtonState {
  changeState(button: ModeButton): void {
    if (button.getState() instanceof HourState) {
      button.setState(new MinuteState());
      console.log("Changed state to: Minute");
    }
  }
}

export class MinuteState implements ButtonState {
  changeState(button: ModeButton): void {
    if (button.getState() instanceof MinuteState) {
      button.setState(new NothingState());
      console.log("Changed state to: Nothing");
    }
  }
}
