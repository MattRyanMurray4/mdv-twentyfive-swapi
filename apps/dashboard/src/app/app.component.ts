import { Component } from '@angular/core';

@Component({
  selector: 'swapi-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'SWAPI-APP';
  links = [
    { path: '/', icon: 'home', title: 'Login' },
    { path: 'people', icon: 'view_list', title: 'People' },
  ];
}
