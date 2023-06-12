import { Model } from 'mongoose';
type CodeType = '01' | '02' | '03';
type SemesterTitleType = 'Autumn' | 'Summer' | 'Fall';
type MonthType =
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
  title: SemesterTitleType;
  year: number;
  code: CodeType;
  startMonth: MonthType;
  endMonth: MonthType;
};

export type AcademicSemesterModel = Model<IAcademicSemester>;
