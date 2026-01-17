
export enum Subject {
  PHYSICS = 'Physique',
  CHEMISTRY = 'Chimie',
  MATHS = 'Mathématiques',
  SVT = 'SVT',
  INFO = 'Informatique',
  LIT = 'Littérature & Langue'
}

export interface Question {
  id: string;
  type: 'QCM' | 'PROBLEM' | 'KEY_POINT';
  text: string;
  options?: string[];
  correctAnswer?: string | number;
  explanation: string;
}

export interface Chapter {
  id: string;
  title: string;
  questions: Question[];
}

export interface Message {
  id: string;
  text: string;
  sender: 'user' | 'gemma';
  timestamp: Date;
}
