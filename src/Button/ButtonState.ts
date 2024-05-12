import { Time } from "../Time/Time";

export interface ButtonState {
  getNextState(): ButtonState;
  handleClick(time: Time): void;
}

export class NothingState implements ButtonState {
  public getNextState(): ButtonState {
    return new HourState();
  }

  handleClick(time: Time): void {
    // Do nothing
  }
}

export class HourState implements ButtonState {
  public getNextState(): ButtonState {
    return new MinuteState();
  }

  handleClick(time: Time): void {
    time.incrementHour();
    console.log("Updated time:", time.toString());
  }
}

export class MinuteState implements ButtonState {
  public getNextState(): ButtonState {
    return new NothingState();
  }

  handleClick(time: Time): void {
    time.incrementMinute();
    console.log("Updated time:", time.toString());
  }
}
