import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Result } from '../model/result';

@Injectable({
  providedIn: 'root'
})
export class ResultService {

  private path = 'api/results';

  constructor(private http: HttpClient) { }

  
  create(result: Result){
    return this.http.post<Result>(this.path, result);
  }
}
