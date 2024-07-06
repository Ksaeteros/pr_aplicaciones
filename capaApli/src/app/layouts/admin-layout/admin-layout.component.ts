// admin-layout.component.ts (ejemplo)
import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router'; // Importar RouterModule y RouterOutlet

@Component({
  standalone: true, // Indicar que es un componente standalone
  imports: [RouterModule, RouterOutlet], // Incluir RouterModule y RouterOutlet en los imports
  selector: 'app-admin-layout',
  templateUrl: './admin-layout.component.html',
  styleUrls: ['./admin-layout.component.css']
})
export class AdminLayoutComponent {}
