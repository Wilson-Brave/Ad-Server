import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
 selector: 'app-signup-page',
 templateUrl: './signup-page.component.html',
 styleUrls: ['./signup-page.component.scss']
})
export class SignupPageComponent implements OnInit {
 signUpForm: FormGroup;
 selectedRole: string = ''; // Initialize selectedRole

 constructor(private fb: FormBuilder, private router: Router) {
    // Initialize signUpForm in the constructor
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', [Validators.required, Validators.pattern('\\+?\\d{1,7}')]],
      email: ['', [Validators.required, Validators.email]]
    });
 }

 ngOnInit(): void {}

 selectRole(role: string): void {
    this.selectedRole = role;
 }

 onSubmit(): void {
    if (this.signUpForm.valid && this.selectedRole) {
      const userId = this.selectedRole === 'publisher' ? `p${Math.floor(Math.random() * 1000000)}` : `a${Math.floor(Math.random() * 1000000)}`;
      const userRole = this.selectedRole === 'publisher' ? '3' : '2';
      const user = {
        userId,
        name: this.signUpForm.value.name,
        address: this.signUpForm.value.address,
        contact: this.signUpForm.value.contact,
        email: this.signUpForm.value.email,
        userRole
      };

      // Here, you would call your service to send the user data to the .NET back-end
      // For example: this.userService.createUser(user).subscribe(...);

      // Redirect based on the selected role
      console.log("At submitting part");
      if (this.selectedRole === 'publisher') {
        this.router.navigate(['/publisher']);
      } else if (this.selectedRole === 'advertiser') {
        this.router.navigate(['/advertiser']);
      }
    } else {
      console.log("Form is not valid or no role selected");
    }
 }
}
