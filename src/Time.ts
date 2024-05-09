export class Time {
  private hour: number;
  private minute: number;
  private second: number;
  private readonly ONE_SECOND = 940; // 1 second = 1000 milliseconds
  private readonly FRENCH_DATE_FORMAT = "fr-FR";
  private isAmPmFormat = false;
  private timeZone: string;
  private options: Intl.DateTimeFormatOptions;

  constructor(timeZone: string) {
    this.timeZone = timeZone;

    this.options = {
      timeZone: timeZone,
      hour12: false,
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    };

    const dateString = new Date().toLocaleDateString(this.FRENCH_DATE_FORMAT, this.options);
    const now = new Date(dateString);
    this.hour = now.getHours();
    this.minute = now.getMinutes();
    this.second = now.getSeconds();
  }

  toString() {
    let formattedHour = this.isAmPmFormat ? this.get12HourFormat() : this.formatNumber(this.hour);
    let amPmDesignation = "";

    if (this.isAmPmFormat) amPmDesignation = this.getAmPmDesignation();

    return `${this.getTimeZone()}: ${formattedHour}:${this.formatNumber(
      this.minute
    )}:${this.formatNumber(this.second)} ${amPmDesignation}`;
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

  toggle24hAndAmPmFormat() {
    this.options.hour12 = !this.options.hour12;
  }

  getTimeZone() {
    return this.timeZone;
  }

  setTimeZone(timeZone: string) {
    this.timeZone = timeZone;
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

  reset() {
    const dateString = new Date().toLocaleDateString(this.FRENCH_DATE_FORMAT, this.options);
    const now = new Date(dateString);
    this.setHour(now.getHours());
    this.setMinute(now.getMinutes());
    this.setSecond(now.getSeconds());
  }
}
