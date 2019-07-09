import { Answer } from './answer';

export interface Question {
  id?: number;
  body: string;
  answers: Answer[];
}
