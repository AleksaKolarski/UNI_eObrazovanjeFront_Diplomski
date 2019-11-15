import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Question } from '../model/question';

@Injectable({
  providedIn: 'root'
})
export class QuestionService {

  private path = 'api/questions';

  constructor(private http: HttpClient) { }

  getAll() : Observable<Question[]>{
    return this.http.get<Question[]>(this.path);
  }

  getById(id: number): Observable<Question>{
	  return this.http.get<Question>(this.path + "/" + id);
  }

  create(question: Question){
    return this.http.post(this.path, question);
  }
}
