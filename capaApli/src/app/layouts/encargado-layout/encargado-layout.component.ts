import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true, // Indicar que es un componente standalone
  imports: [RouterModule, RouterOutlet], // Importar RouterModule y RouterOutlet
  selector: 'app-encargado-layout',
  templateUrl: './encargado-layout.component.html',
  styleUrls: ['./encargado-layout.component.css']
})
export class EncargadoLayoutComponent { }
