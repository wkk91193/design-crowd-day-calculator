export default class DayCounter {
  getWeekdaysBetweenTwoDates(firstDate: Date, secondDate: Date): number {
    // todo
    //calculateWeekdays
    let startDate = this.getDateinUTC(firstDate);
    let endDate = this.getDateinUTC(secondDate);

    startDate = this.addDaystoGivenDate(startDate, 1);
    let counter = 0;
    while (startDate < endDate) {
      if (this.isWeekDay(startDate)) {
        counter++;
      }
      startDate = this.addDaystoGivenDate(firstDate, 1);
    }
    return counter;
  }

  private isWeekDay(day: Date): boolean {
    if (day.getDay() >= 1 && day.getDay() <= 5) {
      return true;
    }
    return false;
  }

  private addDaystoGivenDate(date: Date, numberOfDays: number): Date {
    return new Date(date.setDate(date.getDate() + numberOfDays));
  }

  private getDateinUTC(date: Date): Date {
    return new Date(
      Date.UTC(
        date.getUTCFullYear(),
        date.getUTCMonth(),
        date.getUTCDate(),
        date.getUTCHours(),
        date.getUTCMinutes(),
        date.getUTCSeconds()
      )
    );
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
