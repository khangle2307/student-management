import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IStudent } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = environment.apiUrl;
  constructor(private http: HttpClient) { }

  getALl(): Observable<IStudent[]> {
    return this.http.get<IStudent[]>(`${this.apiUrl}/students`);
  }

  getById(id: number): Observable<IStudent> {
    return this.http.get<IStudent>(`${this.apiUrl}/students/${id}`);
  }

  create(data: IStudent): Observable<IStudent> {
    return this.http.post<IStudent>(`${this.apiUrl}/students`, data)
  }

  updateById(data: IStudent): Observable<IStudent> {
    return this.http.put<IStudent>(`${this.apiUrl}/students/${data.id}`, data)
  }

  removeById(id: number): Observable<IStudent> {
    return this.http.delete<IStudent>(`${this.apiUrl}/students/${id}`);
  }
}
