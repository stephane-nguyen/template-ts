import { Time } from "../../../src/Time/Time";

describe("Time", () => {
  let time: Time;

  beforeEach(() => {
    time = new Time("Europe/Paris");
  });

  describe("Initialization", () => {
    it("should initialize with correct time zone and format", () => {
      expect(time.getTimeZone()).toBe("Europe/Paris");
      expect(time.getIsAmPmFormat()).toBe(false);
    });
  });

  describe("String Representation", () => {
    it("should return the correct string representation without AM/PM format", () => {
      time.setHour(10);
      time.setMinute(30);
      time.setSecond(45);
      const expectedString = "Europe/Paris: 10:30:45";
      expect(time.toString()).toBe(expectedString);
    });

    it("should return the correct string representation with AM/PM format", () => {
      time.setHour(18);
      time.setMinute(30);
      time.setSecond(45);
      time.setIsAmPmFormat(true);
      const expectedString = "Europe/Paris: 06:30:45PM";
      expect(time.toString()).toBe(expectedString);
    });

    it("should handle midnight correctly with AM/PM format", () => {
      time.setHour(0);
      time.setMinute(30);
      time.setSecond(45);
      time.setIsAmPmFormat(true);
      const expectedString = "Europe/Paris: 12:30:45AM";
      expect(time.toString()).toBe(expectedString);
    });
  });

  describe("Incrementing Time", () => {
    it("should increment hour correctly for midnight", () => {
      time.setHour(23);
      time.incrementHour();
      expect(time.getHour()).toBe(0);
    });

    it("should increment hour correctly", () => {
      time.setHour(12);
      time.incrementHour();
      expect(time.getHour()).toBe(13);
    });

    it("should increment minute correctly to go to next hour", () => {
      time.setMinute(59);
      time.incrementMinute();
      expect(time.getMinute()).toBe(0);
    });

    it("should increment minute correctly", () => {
      time.setMinute(34);
      time.incrementMinute();
      expect(time.getMinute()).toBe(35);
    });
  });

  describe("Handling Time Tick for midnight", () => {
    it("should handle tick correctly", () => {
      time.setHour(23);
      time.setMinute(59);
      time.setSecond(59);
      time.tick();
      expect(time.getHour()).toBe(0);
      expect(time.getMinute()).toBe(0);
      expect(time.getSecond()).toBe(0);
    });
  });

  describe("Resetting Time", () => {
    it("should reset correctly", () => {
      time.reset();
      expect(time.getHour()).toBe(new Date().getHours());
      expect(time.getMinute()).toBe(new Date().getMinutes());
      expect(time.getIsAmPmFormat()).toBe(false);
      expect(time.getTimeZone()).toBe("Europe/Paris");
    });
  });
});
