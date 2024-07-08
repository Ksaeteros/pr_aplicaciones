import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { RoleService } from '../../../services/role.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-role-management',
  templateUrl: './role-management.component.html',
  styleUrls: ['./role-management.component.css'],
})
export class RoleManagementComponent implements OnInit {
  id_usuario: number = 0;
  id_rol: number = 0;
  usuarios: any[] = [];
  roles: any[] = [];

  constructor(private userService: UserService, private roleService: RoleService) {
    console.log('RoleManagementComponent constructor: Componente creado');
  }

  ngOnInit() {
    console.log('RoleManagementComponent ngOnInit: Iniciando componente...');
    this.userService.getUsuarios().subscribe({
      next: (data: any) => {
        console.log('RoleManagementComponent ngOnInit: Usuarios obtenidos:', data);
        this.usuarios = data;
      },
      error: (error) => {
        console.error('RoleManagementComponent ngOnInit: Error al obtener usuarios:', error);
      }
    });

    this.roleService.getRoles().subscribe({
      next: (data: any) => {
        console.log('RoleManagementComponent ngOnInit: Roles obtenidos:', data);
        this.roles = data;
      },
      error: (error) => {
        console.error('RoleManagementComponent ngOnInit: Error al obtener roles:', error);
      }
    });
  }

  assignRole() {
    const roleAssignment = {
      id_usuario: this.id_usuario,
      id_rol: this.id_rol
    };

    console.log('RoleManagementComponent assignRole: Asignando rol:', roleAssignment);
    this.userService.assignRole(roleAssignment).subscribe({
      next: (response) => {
        console.log('RoleManagementComponent assignRole: Rol asignado con éxito:', response);
        alert('Rol asignado con éxito');
        // Puedes recargar los usuarios y roles después de asignar el rol
        this.fetchUsuarios();
        this.fetchRoles();
      },
      error: (error) => {
        console.error('RoleManagementComponent assignRole: Error al asignar rol:', error);
        alert('Error al asignar rol: ' + error.message);
      }
    });
  }
  fetchUsuarios() {
    console.log('RoleManagementComponent fetchUsuarios: Obteniendo usuarios...');
    this.userService.getUsuarios().subscribe({
      next: (data: any) => {
        console.log('RoleManagementComponent fetchUsuarios: Usuarios obtenidos:', data);
        this.usuarios = data;
      },
      error: (error) => {
        console.error('RoleManagementComponent fetchUsuarios: Error al obtener usuarios:', error);
      }
    });
  }

  fetchRoles() {
    console.log('RoleManagementComponent fetchRoles: Obteniendo roles...');
    this.roleService.getRoles().subscribe({
      next: (data: any) => {
        console.log('RoleManagementComponent fetchRoles: Roles obtenidos:', data);
        this.roles = data;
      },
      error: (error) => {
        console.error('RoleManagementComponent fetchRoles: Error al obtener roles:', error);
      }
    });
  }

}

