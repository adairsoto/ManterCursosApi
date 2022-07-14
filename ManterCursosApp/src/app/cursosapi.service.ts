import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Admin, Curso } from './interfaces';

@Injectable({
  providedIn: 'root'
})
export class CursosapiService {

  apiUrl = 'https://localhost:7096/api';
  private currentUserSource = new BehaviorSubject<Admin>(null);
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private http: HttpClient, private router: Router) { }

  // Login/Logout

  getCurrentUserValue() {
    return this.currentUserSource.value;
  }

  loadCurrentUser(token: string) {
   
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', `Bearer ${token}`);

    return this.http.get(this.apiUrl + '/account', {headers}).pipe(
      map((user: Admin) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  login(values: any) {
    return this.http.post(this.apiUrl + '/account/login', values).pipe(
      map((user: Admin) => {
        if (user) {
          localStorage.setItem('token', user.token);
          this.currentUserSource.next(user);
        }
      })
    )
  }

  logout() {
    localStorage.removeItem('token');
    this.currentUserSource.next(null);
    this.router.navigateByUrl('/');
  }

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

  //Search

}

