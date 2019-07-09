import { QuestionAnswerPair } from './question-answer-pair';
import { Log } from './log';

export interface Result {
  id?: number;
  name: string;
  answers: QuestionAnswerPair[];
  log: Log[];
}
