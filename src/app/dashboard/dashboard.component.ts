import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  username: string = '';
  password: string = '';
  constructor(private router: Router) {
   const nav = this.router.getCurrentNavigation();
   const state = nav?.extras.state as { username: string, password: string };
    if (state) {
      this.username = state.username;
      this.password = state.password;
    } else {
      this.router.navigate(['/']);
    }
  }
  onLogout(){
    this.router.navigate(['/'])

  }
}
