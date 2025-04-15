import { NgIf } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';

interface userdetails {
  name: string,
  password: string
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,NgIf],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  @ViewChild('loginForm') loginForm!: NgForm;
  constructor(private router: Router) {}
  user: userdetails = {
    name: '',
    password: ''
  };
  onChange() {
    console.log("username", this.user.name);
    console.log("password", this.user.password);
  }
  onLogin() {
    if (this.loginForm.invalid) {
      Object.values(this.loginForm.controls).forEach(control => control.markAsTouched());
      return;
    }
    const storedUser = localStorage.getItem('authUser');
    if (!storedUser) {
      localStorage.setItem('authUser', JSON.stringify(this.user));
      this.router.navigate(['dashboard']);
    } else { 
      const parsedUser = JSON.parse(storedUser);
      if (parsedUser.name === this.user.name && parsedUser.password === this.user.password) {
        this.router.navigate(['dashboard']);
      } else {
        alert('Invalid username or password');
      }
    }
  }
  
}
