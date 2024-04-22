import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
 selector: 'app-signup-page',
 templateUrl: './signup-page.component.html',
 styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent {
 
  user = {
    firstName: '',
    lastName: '',
    address: '',
    phoneNo: '',
    email: '',
    password: '',
    role: ''
  };

  constructor(private router: Router) {}

  onSubmit() {
    const userId = this.generateUserId(this.user.role);
    console.log('User ID:', userId); // For debugging

    if (this.user.role === 'Advertiser') {
      this.router.navigate(['/advertiser']);
    } else if (this.user.role === 'Publisher') {
      this.router.navigate(['/publisher']);
    }
  }

  generateUserId(role: string): string {
    const prefix = role === 'Advertiser' ? 'a' : 'p';
    const randomNumber = Math.floor(1000000 + Math.random() * 9000000); // Generate 7-digit random number
    return prefix + randomNumber;
  }
  
}
