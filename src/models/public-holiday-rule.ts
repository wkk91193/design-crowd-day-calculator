import DayCounter from '../services/day-counter-service';
import dayCounter from '../services/day-counter-service';

export class PublicHolidayRule {
  private dayOfWeek: DayOfWeek = DayOfWeek.Sunday;
  private occurrence: Occurrence = Occurrence.First;
  private day: number = 0;
  private month: number = 0;
  private shouldDelay: boolean = false;

  //fixed day public holiday ,and should delay if it falls on a weekend
  public static fromFixedPublicHolidayAndAllowedToDelayRule(
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
    if (Number.isNaN(Date.parse(`2013/${month}/${day}`))) {
      throw new Error('Invalid month and date combination');
    }
    const publicHolidayRule = new PublicHolidayRule();
    publicHolidayRule.day = day;
    publicHolidayRule.month = month;
    publicHolidayRule.shouldDelay = shouldDelay;
    return publicHolidayRule;
  }

  //occurrence of day of a week in specific month
  public static fromOccurrenceOfADayOfASpecificMonth(
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
  private getOccurenceOfDayInMonth(year: number, month: number, occurence: Occurrence, dayOfWeek: DayOfWeek): Date {
    //January-0, December-11
    let firstDayOfTheMonth = new Date(`${year}/${month}/01`);
    let firstOccurenceOfDay =
      firstDayOfTheMonth.getDay() === dayOfWeek.valueOf()
        ? firstDayOfTheMonth
        : DayCounter.addDaystoGivenDate(
            firstDayOfTheMonth,
            Math.abs(this.dayOfWeek.valueOf() - firstDayOfTheMonth.getDay())
          );
    console.log(DayCounter.addDaystoGivenDate(firstDayOfTheMonth, 7 * occurence.valueOf()));
    return DayCounter.addDaystoGivenDate(firstDayOfTheMonth, 7 * occurence.valueOf());
    return new Date(firstOccurenceOfDay.setUTCDate(7 * occurence.valueOf()));
  }

  public getPublicHolidayDateFromYear(year: number): Date {
    //if day of week occurence rule
    if (this.day === 0) {
      return this.getOccurenceOfDayInMonth(year, this.month, this.occurrence, this.dayOfWeek);
    } else {
      //fixed or shouldDelay rule
      let date = new Date(`${year}/${this.month}/${this.day}`);
      if (this.shouldDelay) {
        //if date falls on weekend
        console.log(date.getDay());
        console.log(DayOfWeek.Saturday);
        if (date.getDay() === DayOfWeek.Saturday || date.getDay() === DayOfWeek.Sunday) {
          const daysUntilMonday = (DayOfWeek.Monday - date.getDay() + 7) % 7;
          date = dayCounter.addDaystoGivenDate(date, daysUntilMonday);
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
  Fifth = 4,
}
