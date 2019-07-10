export class Log {
  id?: number;
  type: string;
  before: number;
  after: number;
  time: Date;

  constructor(type: string, before: number, after: number, time: Date){
    this.type = type;
    this.before = before;
    this.after = after;
    this.time = time;
  }
}
