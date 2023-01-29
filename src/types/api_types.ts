/**
 * This file can be used to store types and interfaces for data received from the API.
 * It's good practice to name your interfaces in the following format:
 * IMyInterfaceName - Where the character "I" is prepended to the name of your interface.
 * This helps remove confusion between classes and interfaces.
 */

/**
 * This represents a class as returned by the API
 */
export interface IUniversityClass {
  classId: string;
  title: string;
  description: string;
  meetingTime: string;
  meetingLocation: string;
  status: string;
  semester: string;
}

export interface Grade {
  studentId: string;
  name: string;
  classId: string;
  grades: any;
}

export interface tableHeader {
  studentId: string;
  studentName:string;
  classId: string;
  className: string;
  semester: string;
  finalGrade: string;
}

export interface gradeColumn {
  id: 'studentId' | 'studentName' | 'classId' | 'className' | 'semester' | 'finalGrade';
  label: string;
  minWidth?: number;
  align?: 'right';
  format?: (value: number) => string;
}

export interface weight {
  assignmentId: string;
  classId: string;
  data: Date;
  weight: number;
}