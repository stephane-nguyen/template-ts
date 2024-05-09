export class Time {
  private hour: number;
  private minute: number;
  private second: number;
  private readonly ONE_SECOND = 1000; // 1 second = 1000 milliseconds
  private isAmPmFormat = false;
  private timeZone: string;

  constructor() {
    const now = new Date();
    this.hour = now.getHours();
    this.minute = now.getMinutes();
    this.second = now.getSeconds();
  }

  toString() {
    let formattedHour = this.isAmPmFormat ? this.get12HourFormat() : this.formatNumber(this.hour);
    let amPmDesignation = "";

    if (this.isAmPmFormat) amPmDesignation = this.getAmPmDesignation();

    return `${formattedHour}:${this.formatNumber(this.minute)}:${this.formatNumber(
      this.second
    )} ${amPmDesignation}`;
  }

  private get12HourFormat(): number {
    let hour12 = this.hour % 12;
    if (hour12 === 0) hour12 = 12;
    return hour12;
  }

  private getAmPmDesignation(): string {
    return this.hour < 12 ? "AM" : "PM";
  }

  private formatNumber(num: number) {
    return num < 10 ? `0${num}` : num;
  }

  oneSecond() {
    return this.ONE_SECOND;
  }

  getHour() {
    return this.hour;
  }

  setHour(hour: number) {
    if (this.isAmPmFormat) {
      if (hour >= 1 && hour <= 12) {
        this.hour = hour;
      }
    } else {
      if (hour >= 0 && hour <= 23) {
        this.hour = hour;
      } else if (hour === 24) {
        this.hour = 0;
      }
    }
  }

  getMinute() {
    return this.minute;
  }

  setMinute(minute: number) {
    if (minute >= 0 && minute <= 59) {
      this.minute = minute;
    } else if (this.minute === 60) {
      this.minute = 0;
      this.hour++;
    }
  }

  getSecond() {
    return this.second;
  }

  setSecond(second: number) {
    this.second = second;
  }

  getIsAmPmFormat() {
    return this.isAmPmFormat;
  }

  setIsAmPmFormat(value: boolean) {
    this.isAmPmFormat = value;
  }

  addOneHour() {
    this.hour++;
    if (this.hour === 24) {
      this.hour = 0;
    }
  }

  addOneMinute() {
    this.minute++;
    if (this.minute === 60) {
      this.minute = 0;
    }
  }

  tick() {
    this.second++;
    if (this.second === 60) {
      this.second = 0;
      this.minute++;
      if (this.minute === 60) {
        this.minute = 0;
        this.hour++;
        if (this.hour === 24) {
          this.hour = 0;
        }
      }
    }
  }
}
