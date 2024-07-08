import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Importar FormsModule
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [FormsModule],  // Incluir FormsModule en los imports
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent {
  correo_electronico: string = '';
  contrasena: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  login() {
    this.authService.login({ correo_electronico: this.correo_electronico, contrasena: this.contrasena }).subscribe(
      (response: any) => {
        localStorage.setItem('token', response.token);
        const decodedToken = this.decodeToken(response.token);
        if (decodedToken.role === 'Administrador') {
          this.router.navigate(['/admin/dashboard']);
        } else if (decodedToken.role === 'Gerente General') {
          this.router.navigate(['/gerente/dashboard']);
        } else if (decodedToken.role === 'Encargado de Ãrea') {
          this.router.navigate(['/encargado/dashboard']);
        }
      },
      (error) => {
        console.error('Login failed', error);
      }
    );
  }

  private decodeToken(token: string) {
    return JSON.parse(atob(token.split('.')[1]));
  }
}
