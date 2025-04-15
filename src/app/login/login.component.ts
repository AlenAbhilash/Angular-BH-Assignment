import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

interface userdetails {
  name: string,
  password: string
}
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  constructor(private router: Router) { }
  user: userdetails = {
    name: '',
    password: ''
  }
  onChange() {
    console.log("username", this.user.name)
    console.log("password", this.user.password)
  }
  onLogin() {
    if (this.user.name === '' || this.user.password === '') {
      alert("Please enter the username and the password");
    } else {
      this.router.navigate(['dashboard'], {
        state: { username: this.user.name, password: this.user.password }
      })
    }
  }
}
