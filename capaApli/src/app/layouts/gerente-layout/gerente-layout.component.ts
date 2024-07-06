import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-gerente-layout',
    standalone: true,
    imports: [RouterModule, RouterOutlet],
    templateUrl: './gerente-layout.component.html',
    styleUrls: ['./gerente-layout.component.css']
})
export class GerenteLayoutComponent {}
