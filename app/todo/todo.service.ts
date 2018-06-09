import { Tasks } from './tasks.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AddTaskService {

  constructor(private http: HttpClient) { }
  readonly httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8',
    })
  };
  url = 'https://mysterious-cove-64998.herokuapp.com/tasks';
  posttasks(value) {
    const body = {
      task: ''
    };
    body.task = value;
    console.log(body);

    return this.http.post<string>(this.url, body, this.httpOptions);
  }
  getalltasks() {
    return this.http.get<Tasks[]>(this.url);
  }
  deleteById(id) {
    const urlDelete = this.url + '/' + id;
    return this.http.delete(urlDelete);
  }

}
