import { Time } from "../Time/Time";
import { Watch } from "../Watch";

export abstract class ButtonState {
  protected watch: Watch;
  constructor(watch: Watch) {
    this.watch = watch;
  }
  public abstract changeState(): void;
  public abstract handleClick(time: Time): void;
}

export class NothingState extends ButtonState {
  public getNextState(): ButtonState {
    return new HourState(this.watch);
  }

  changeState(): void {
    this.watch.setState(new HourState(this.watch));
  }

  handleClick(time: Time): void {
    // Do nothing
  }
}

export class HourState extends ButtonState {
  changeState(): void {
    this.watch.setState(new MinuteState(this.watch));
  }

  handleClick(time: Time): void {
    time.incrementHour();
    console.log("Updated time:", time.toString());
  }
}

export class MinuteState extends ButtonState {
  changeState(): void {
    this.watch.setState(new NothingState(this.watch));
  }

  handleClick(time: Time): void {
    time.incrementMinute();
    console.log("Updated time:", time.toString());
  }
}
