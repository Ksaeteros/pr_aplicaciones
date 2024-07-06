import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthService {

  private apiUrl = 'http://localhost:3000/api/auth';

  constructor(private http: HttpClient, private router: Router) {}

  login(credentials: { correo_electronico: string, contrasena: string }) {
    console.log('AuthService - login: Enviando solicitud de inicio de sesión al backend...');
    return this.http.post(`${this.apiUrl}/login`, credentials).pipe(
      tap((response: any) => {
        console.log('AuthService - login: Respuesta exitosa del backend:', response);
        localStorage.setItem('token', response.token);
        const decodedToken = this.decodeToken(response.token);
        console.log('AuthService - login: Rol del usuario:', decodedToken.role);
      })
    );
  }

  logout() {
    console.log('AuthService - logout: Cerrando sesión...');
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }

  get isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    console.log('AuthService - isLoggedIn: Verificando si el usuario está autenticado...', !!token);
    return !!token; // Doble negación para convertir a booleano
  }

  hasRole(role: string): boolean {
    const token = localStorage.getItem('token');
    if (!token) {
      console.log('AuthService - hasRole: No se encontró token, el usuario no tiene ningún rol.');
      return false; 
    }

    const decodedToken = this.decodeToken(token);
    const hasRole = decodedToken.role === role;
    console.log(`AuthService - hasRole: ¿El usuario tiene el rol "${role}"?`, hasRole);
    return hasRole; 
  }

  private decodeToken(token: string) {
    try {
      const payload = token.split('.')[1];
      const decodedPayload = atob(payload);
      return JSON.parse(decodedPayload);
    } catch (error) {
      console.error('AuthService - decodeToken: Error al decodificar el token:', error);
      return null; // O lanzar un error si prefieres
    }
  }
}
