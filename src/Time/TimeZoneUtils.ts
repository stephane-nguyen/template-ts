export class TimeZoneUtils {
  async populateTimezonesInSelectBar() {
    const timezones = await this.getTimezones();
    this.populateSelectDropdown(timezones);
  }

  populateSelectDropdown(timezones: string[]) {
    const timezoneSelect = document.getElementById("timezoneSelect") as HTMLSelectElement;
    timezones.forEach((timezone) => {
      const option = document.createElement("option");
      option.text = timezone;
      option.value = timezone;
      timezoneSelect.appendChild(option);
    });
  }

  async getTimezones(): Promise<string[]> {
    // API to get all timezone : http://worldtimeapi.org/api/timezone
    // Check http://worldtimeapi.org/pages/examples
    const timezonesApiUrl = "http://worldtimeapi.org/api/timezone";

    try {
      const response = await fetch(timezonesApiUrl);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error("Error fetching timezones:", error);
      return [];
    }
  }

  getSelectedTimezoneInSelectBar(): string {
    const selectedTimeZone = (document.getElementById("timezoneSelect") as HTMLSelectElement).value;
    return selectedTimeZone;
  }
}
