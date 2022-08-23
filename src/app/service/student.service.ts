import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { InputForm, Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getALl(): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}/students`);
  }

  getById(id: number): Observable<Student> {
    return this.http.get<Student>(`${this.apiUrl}/students/${id}`);
  }

  create(data: InputForm): Observable<InputForm> {
    return this.http.post<InputForm>(`${this.apiUrl}/students`, data)
  }

  updateById(data: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/students/${data.id}`, data)
  }

  removeById(id: number): Observable<Student> {
    return this.http.delete<Student>(`${this.apiUrl}/students/${id}`);
  }
}
