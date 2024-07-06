import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
  standalone: true,  // Añadir standalone: true
  imports: [RouterModule, RouterOutlet],  // Importar RouterModule y RouterOutlet
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'capaApli';
}