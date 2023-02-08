type DateRange = {
  startDate: Date;
  endDate: Date;
};

export default class DayCounter {
  //Returns the number of weekdays between first date and second date (first and second exclusive)
  getWeekdaysBetweenTwoDatesCount(firstDate: Date, secondDate: Date): number {
    let startDate = firstDate;
    let endDate = secondDate;
    if (endDate < startDate) {
      return 0;
    }
    const normaliseDateRange = this.getNormalisedDatesForDaylightSavings(
      startDate,
      endDate
    );
    startDate = normaliseDateRange.startDate;
    endDate = normaliseDateRange.endDate;
    return this.getListOfWeekDaysBetweenTwoDates(startDate, endDate).length;
  }

  getBusinessDaysBetweenTwoDatesCount(
    firstDate: Date,
    secondDate: Date,
    publicHolidays: Date[]
  ): number {
    const weekDates = this.getListOfWeekDaysBetweenTwoDates(
      firstDate,
      secondDate
    );
    // const businessDayList = weekDates.filter((weekday) =>
    //   publicHolidays.some((holiday) => holiday.getTime() !== weekday.getTime())
    // );
    // let businessDayList =[];
    // publicHolidays.forEach(holiday=>{
    //     businessDayList = weekDates.filter(weekday=>{
    //         weekday.getTime() !== holiday.getTime()
    //     })
    // });
    
    const businessDaysList = weekDates.filter((el) => {
        return publicHolidays.some((f) => {
          return f.getTime() !== el.getTime();
        });
      });
      

    return businessDaysList.length;
  }

  private getListOfWeekDaysBetweenTwoDates(
    startDate: Date,
    endDate: Date
  ): Date[] {
    const weekdaysList = [];
    let tempDate = this.addDaystoGivenDate(startDate, 1);
    while (tempDate < endDate) {
      if (this.isWeekDay(tempDate)) {
        weekdaysList.push(new Date(tempDate));
      }
      tempDate = this.addDaystoGivenDate(tempDate, 1);
    }
    return weekdaysList;
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
}
