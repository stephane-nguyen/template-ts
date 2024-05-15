import { TimeDisplaying } from "./TimeDisplaying";

export class Time {
  private hour: number;
  private minute: number;
  private second: number;
  private readonly ONE_SECOND = 1000; // 1 second = 1000 milliseconds
  private readonly DATE_FORMAT_LANGUAGE = "fr-FR";
  private timeZone: string;
  private isAmPmFormat = false;
  private timeDisplaying = new TimeDisplaying(this);
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

    const dateString = new Date().toLocaleDateString(this.DATE_FORMAT_LANGUAGE, this.options);
    const timeString = dateString.split(" ")[1];
    const [hour, minute, second] = timeString.split(":").map(Number);

    this.hour = hour;
    this.minute = minute;
    this.second = second;
  }

  toString() {
    let hour;
    if (this.getIsAmPmFormat()) {
      if (this.getHour() % 12 === 0) {
        hour = 12; // Convert 0 to 12 for am pm format
      } else {
        hour = this.timeDisplaying.formatNumber(this.getHour() % 12);
      }
    } else {
      hour = this.timeDisplaying.formatNumber(this.getHour());
    }

    const minutes = this.timeDisplaying.formatNumber(this.getMinute());
    const seconds = this.timeDisplaying.formatNumber(this.getSecond());

    let timeString = `${this.getTimeZone()}: ${hour}:${minutes}:${seconds}`;

    if (this.getIsAmPmFormat()) {
      const amPm = this.timeDisplaying.getAmPmDesignation();
      timeString += ` ${amPm}`;
    }

    return timeString;
  }

  oneSecond() {
    return this.ONE_SECOND;
  }

  getDateFormatLanguage() {
    return this.DATE_FORMAT_LANGUAGE;
  }

  getHour(): number {
    return this.hour;
  }

  setHour(hour: number) {
    this.hour = hour;
  }

  incrementMinute() {
    const maxMinute = 59;
    const initialMinuteValue = 0;
    if (this.getMinute() === maxMinute) {
      this.incrementHour();
      this.setMinute(initialMinuteValue);
    } else {
      this.setMinute(this.getMinute() + 1);
    }
  }

  incrementHour() {
    const maxHour = 23;
    const initialHourValue = 0;
    if (this.getHour() === maxHour) {
      this.setHour(initialHourValue);
    } else {
      this.setHour(this.getHour() + 1);
    }
  }

  getMinute() {
    return this.minute;
  }

  setMinute(minute: number) {
    this.minute = minute;
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

  setIsAmPmFormat(isAmPmFormat: boolean) {
    this.isAmPmFormat = isAmPmFormat;
  }

  getTimeZone() {
    return this.timeZone;
  }

  setTimeZone(timeZone: string) {
    this.timeZone = timeZone;
  }

  getOptions() {
    return this.options;
  }

  tick() {
    // Continuous clock
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
    const dateString = new Date().toLocaleDateString(this.DATE_FORMAT_LANGUAGE, this.options);
    const now = new Date(dateString);
    this.setIsAmPmFormat(false);
    this.setHour(now.getHours());
    this.setMinute(now.getMinutes());
    this.setSecond(now.getSeconds());
  }
}
