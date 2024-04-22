import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.scss'
})
export class LoginPageComponent {
  user = { email: '', password: ''};

  constructor(private router: Router) {}

  onLogin() {
    const { email, password } = this.user;
    if (email === 'admin@server.com' && password === '1234') {
      this.router.navigate(['/admin']);
    } else if (email === 'publisher@server.com' && password === '1234') {
      this.router.navigate(['/publisher']);
    } else if (email === 'advertiser@server.com' && password === '1234') {
      this.router.navigate(['/advertiser']);
    } else {
      alert('Incorrect credentials');
    }
  }
}
