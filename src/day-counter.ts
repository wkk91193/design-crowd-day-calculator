
type DateRange = {
  startDate: Date;
  endDate: Date;
};

export default class DayCounter {

 //Returns the number of weekdays between first date and second date (first and second exclusive)
  getWeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    let startDate = firstDate;
    let endDate = secondDate;
    if(endDate< startDate){
        return 0;
    }
    const normaliseDateRange = this.getNormalisedDatesForDaylightSavings(
      startDate,
      endDate
    );
    startDate = normaliseDateRange.startDate;
    endDate = normaliseDateRange.endDate;
    return this.calculateWeekDays(startDate, endDate);
  }

  private calculateWeekDays(startDate :Date, endDate :Date): number{
    let tempDate = this.addDaystoGivenDate(startDate, 1);
    let counter = 0;
    while (tempDate < endDate) {
      if (this.isWeekDay(tempDate)) {
        counter++;
      }
      tempDate = this.addDaystoGivenDate(tempDate, 1);
    }
    return counter;

  }

  private isWeekDay(day: Date): boolean {
    if (day.getUTCDay() >= 1 && day.getUTCDay() <= 5) {
      return true;
    }
    return false;
  }

  private addDaystoGivenDate(date: Date, numberOfDays: number): Date {
    return new Date(date.setUTCDate(date.getUTCDate() + numberOfDays));
  }

  private getNormalisedDatesForDaylightSavings(
    startDate: Date,
    endDate: Date
  ): DateRange {
    let timezoneDiff =
      endDate.getTimezoneOffset() - startDate.getTimezoneOffset();
    if (timezoneDiff != 0) {
      // Handle daylight saving time difference between two dates.
      startDate.setMinutes(startDate.getMinutes() + timezoneDiff);
      endDate.setMinutes(endDate.getMinutes() + timezoneDiff);
    }

    return { startDate: startDate, endDate: endDate };
  }
  getBusinessDaysBetweenTwoDates(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: Date[]
  ): number {
    // todo
    return -1;
  }
}
