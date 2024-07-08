import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  standalone: true,  
  imports: [FormsModule],  // Incluye FormsModule en los imports
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})

export class UserRegistrationComponent {
  nombre: string = '';
  correo_electronico: string = '';
  contrasena: string = '';
  id_rol: number = 0;

  constructor(private userService: UserService) {}

  register() {
    const newUser = {
      nombre: this.nombre,
      correo_electronico: this.correo_electronico,
      contrasena: this.contrasena,
      id_rol: this.id_rol
    };

    this.userService.register(newUser).subscribe(
      (response: any) => {
        alert('Usuario registrado con éxito');
      },
      (error: any) => {
        alert('Error al registrar usuario: ' + error.message);
      }
    );
  }
}
