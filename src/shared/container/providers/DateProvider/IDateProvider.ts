interface IDateProvider {
  compareInHours(start_date: Date, end_date: Date): number;
  compareInDays(start_date: Date, end_date: Date): number;
  convertToUTC(date: Date): string;
  dateNow(): Date;
  addDays(days: number): Date;
  addHours(hours: number): Date;
  compareIfExpired(start_date: Date, end_date: Date): boolean;
  removeMonths(months: number): Date;
}

export { IDateProvider };
