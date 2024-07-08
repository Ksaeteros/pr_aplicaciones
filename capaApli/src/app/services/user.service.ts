import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'http://localhost:3000/api/usuarios';

  constructor(private http: HttpClient) {}

  getUsuarios(): Observable<any> {
    return this.http.get<any>(this.apiUrl);
  }

  assignRole(data: { id_usuario: number; id_rol: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/assign-role`, data);
  }

  register(newUser: { nombre: string; correo_electronico: string; contrasena: string; id_rol: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/register`, newUser);
  }
}
