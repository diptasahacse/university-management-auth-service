import { Model } from 'mongoose';
export type AcademicSemesterCodes = '01' | '02' | '03';
export type AcademicSemesterTitles = 'Autumn' | 'Summer' | 'Fall';
export type AcademicSemesterMonths =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';
export type IAcademicSemester = {
  title: AcademicSemesterTitles;
  year: string;
  code: AcademicSemesterCodes;
  startMonth: AcademicSemesterMonths;
  endMonth: AcademicSemesterMonths;
};

export type IAcademicSemesterFilters = { searchTerm?: string };

export type AcademicSemesterModel = Model<IAcademicSemester>;
