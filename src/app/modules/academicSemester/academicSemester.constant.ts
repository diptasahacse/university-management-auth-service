import {
  AcademicSemesterCodes,
  AcademicSemesterTitles,
  AcademicSemesterMonths,
} from './academicSemester.interface';

export const academicSemesterMonths: AcademicSemesterMonths[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];
export const academicSemesterTitles: AcademicSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];
export const academicSemesterCodes: AcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterTitleCodeMapper: {
  [key: string]: string;
} = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};