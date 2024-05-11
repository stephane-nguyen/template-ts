import { TimeDisplaying } from "../../../src/Time/TimeDisplaying";
import { Time } from "../../../src/Time/Time";

describe("TimeDisplaying", () => {
  let timeDisplaying: TimeDisplaying;
  let time: Time;

  beforeEach(() => {
    time = new Time("UTC");
    timeDisplaying = new TimeDisplaying(time);
  });

  describe("getAmPmDesignation()", () => {
    it("should return PM if AM/PM format is enabled and hour is greater than or equal to 12", () => {
      time.setIsAmPmFormat(true);
      time.setHour(12);
      expect(timeDisplaying.getAmPmDesignation()).toBe("PM");
      time.setHour(18);
      expect(timeDisplaying.getAmPmDesignation()).toBe("PM");
    });

    it("should return AM if AM/PM format is enabled and hour is less than 12", () => {
      time.setIsAmPmFormat(true);
      time.setHour(5);
      expect(timeDisplaying.getAmPmDesignation()).toBe("AM");
      time.setHour(11);
      expect(timeDisplaying.getAmPmDesignation()).toBe("AM");
    });

    it("should return an empty string if AM/PM format is disabled", () => {
      time.setIsAmPmFormat(false);
      time.setHour(14);
      expect(timeDisplaying.getAmPmDesignation()).toBe("");
    });

    it("should return AM for hour 24 if AM/PM format is enabled", () => {
      time.setIsAmPmFormat(true);
      time.setHour(24);
      expect(timeDisplaying.getAmPmDesignation()).toBe("AM");
    });
  });

  describe("getAmPmFormat()", () => {
    it("should return hour in 12-hour format", () => {
      time.setHour(13);
      expect(timeDisplaying.getAmPmFormat()).toBe(1);
      time.setHour(0);
      expect(timeDisplaying.getAmPmFormat()).toBe(12);
    });
  });

  describe("formatNumber()", () => {
    it("should prepend zero to single-digit numbers", () => {
      expect(timeDisplaying.formatNumber(5)).toBe("05");
      expect(timeDisplaying.formatNumber(9)).toBe("09");
    });

    it("should return the number itself for double-digit numbers", () => {
      expect(timeDisplaying.formatNumber(15)).toBe(15);
      expect(timeDisplaying.formatNumber(23)).toBe(23);
    });
  });
});
