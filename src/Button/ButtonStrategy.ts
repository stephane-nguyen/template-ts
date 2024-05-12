import { Watch } from "../Watch";
import { Time } from "../Time/Time";
import { NothingState } from "./ButtonState";

export interface ButtonStrategy {
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
  private time: Time;
  private watch: Watch;

  constructor(time: Time, watch: Watch) {
    this.time = time;
    this.watch = watch;
  }

  press(): void {
    this.watch.setState(new NothingState());
    this.time.reset();
  }
}

export class CreateWatchStrategy implements ButtonStrategy {
  private getTimezone: () => string;

  constructor(getTimezone: () => string) {
    this.getTimezone = getTimezone;
  }

  press(): Watch | void {
    const timezone = this.getTimezone();
    if (timezone === "Select a timezone" || timezone === "") {
      alert("Select a timezone please");
    } else {
      return new Watch(timezone);
    }
  }
}

export class ChangeTimeFormatStrategy implements ButtonStrategy {
  private time: Time;

  constructor(time: Time) {
    this.time = time;
  }

  press(): void {
    this.time.setIsAmPmFormat(!this.time.getIsAmPmFormat());
  }
}
