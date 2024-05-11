import { Time } from "./Time";

export class TimeDisplaying {
  private time: Time;

  constructor(time: Time) {
    this.time = time;
  }

  public getAmPmDesignation(): string {
    if (this.time.getIsAmPmFormat()) {
      if (this.time.getHour() === 24) return "AM";
      return this.time.getHour() >= 12 ? "PM" : "AM";
    } else {
      return "";
    }
  }

  public getAmPmFormat(): number {
    let hour12 = this.time.getHour() % 12;
    if (hour12 === 0) hour12 = 12;
    return hour12;
  }

  public formatNumber(num: number): string | number {
    return num < 10 ? `0${num}` : num;
  }
}
