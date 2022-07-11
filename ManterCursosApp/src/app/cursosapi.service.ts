import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Curso } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class CursosapiService {

  readonly apiUrl = 'https://localhost:7096/api';

  constructor(private http: HttpClient) { }

  // Curso

  getCursoList():Observable<any[]> {
    return this.http.get<any>(this.apiUrl + '/cursos');
  }

  getCursoById(id:number|string): Observable<Curso> {
    return this.http.get<any>(this.apiUrl + `/cursos/${id}`);
  }

  addCurso(data: any) {
    return this.http.post(this.apiUrl + '/cursos', data);
  }
  
  updateCurso(id:number|string, data:any) {
    return this.http.put(this.apiUrl + `/cursos/${id}`, data);
  }
  
  deleteCurso(id:number|string) {
    return this.http.delete(this.apiUrl + `/cursos/${id}`);
  }

  // Categoria

  getCursoCategoriaList():Observable<any[]> {
    return this.http.get<any>(this.apiUrl + '/cursocategorias');
  }
 
  // Status

  getStatusList():Observable<any[]> {
    return this.http.get<any>(this.apiUrl + '/status');
  }

  // Log

  getLogs():Observable<any[]> {
    return this.http.get<any>(this.apiUrl + '/logs');
  }

  createLog(data: any) {
    return this.http.post(this.apiUrl + '/logs', data);
  }

}

