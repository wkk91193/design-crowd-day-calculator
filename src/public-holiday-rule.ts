export class PublicHolidayRule {
  private dayOfWeek: DayOfWeek = DayOfWeek.Sunday;
  private occurrence: Occurrence = Occurrence.First;
  private day: number = 0;
  private month: number = 0;
  private shouldDelay: boolean = false;

  //fixed day public holiday ,and should delay if it falls on a weekend
  public static fromFirstTwoRules(
    month: number,
    day: number,
    shouldDelay: boolean
  ): PublicHolidayRule {
    if (day < 1 || day > 31) {
      throw new Error('Invalid day');
    }
    if (month < 1 || month > 12) {
      throw new Error('Invalid month');
    }
    if (Number.isNaN(Date.parse(`2013-${month}-${day}`))) {
      throw new Error('Invalid month and date combination');
    }
    const publicHolidayRule = new PublicHolidayRule();
    publicHolidayRule.day = day;
    publicHolidayRule.month = month;
    publicHolidayRule.shouldDelay = shouldDelay;
    return publicHolidayRule;
  }

  //occurrence of day of a week in specific month
  public static thirdRule(
    dayOfWeek: DayOfWeek,
    occurrence: Occurrence,
    month: number
  ): PublicHolidayRule {
    if (month < 1 || month > 12) {
      throw new Error('Invalid month');
    }
    const publicHolidayRule = new PublicHolidayRule();
    publicHolidayRule.dayOfWeek = dayOfWeek;
    publicHolidayRule.occurrence = occurrence;
    publicHolidayRule.month = month;
    return publicHolidayRule;
  }
  //Returns date of the occurence of a specific day of week
  private getOccurenceOfDayInMonth(
    year: number,
    month: number,
    occurence: Occurrence,
    dayOfWeek: DayOfWeek
  ): Date {
     //January-0, December-11
    let firstDayOfTheMonth = new Date(`${year}-${month}-1`);
    let firstOccurenceOfDay =
      firstDayOfTheMonth.getUTCDay() === dayOfWeek.valueOf()
        ? firstDayOfTheMonth
        : new Date(
            firstDayOfTheMonth.setUTCDate(
              Math.abs(
                this.dayOfWeek.valueOf() - firstDayOfTheMonth.getUTCDay()
              )
            )
          );
    return new Date(firstOccurenceOfDay.setUTCDate(7 * occurence.valueOf()));
  }

  public getPublicHolidayDateFromYear(year: number): Date {
    //if day of week occurence rule
    if ((this.day === 0)) {
      return this.getOccurenceOfDayInMonth(year, this.month,this.occurrence, this.dayOfWeek);
    }
    else{
    //fixed or shouldDelay rule
        let dateString =`${year}-${this.month}-${this.day}`;
        let date = new Date(`${year}-${this.month}-${this.day}`);
        let testDate =new Date('2013-10-08');
        if(this.shouldDelay){
            //if date falls on weekend
            if(date.getUTCDay()===DayOfWeek.Saturday || date.getUTCDay() === DayOfWeek.Sunday ){
                const daysUntilMonday = ((DayOfWeek.Monday - date.getUTCDay()+7))%7;
                date = new Date(date.setUTCDate(daysUntilMonday));

            }
        }
        return date;
    }
  }
}

export enum DayOfWeek {
  Sunday = 0,
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
}

export enum Occurrence {
  First = 0,
  Second = 1,
  Third = 2,
  Fourth = 3,
}
