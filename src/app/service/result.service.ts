import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../model/result';
import { Observable } from 'rxjs';
import { ResultName } from '../model/result-name';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private path = 'api/results';

  constructor(private http: HttpClient) { }

  
  create(result: Result){
    return this.http.post<Result>(this.path, result);
  }

  getAllResultNames(): Observable<ResultName[]>{
	  return this.http.get<ResultName[]>(this.path + "/names");
  }

  getResult(id: number): Observable<Result>{
	  return this.http.get<Result>(this.path + "/getById/" + id);
  }
}
