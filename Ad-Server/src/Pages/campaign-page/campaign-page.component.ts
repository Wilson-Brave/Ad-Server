import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-campaign-page',
  templateUrl: './campaign-page.component.html',
  styleUrls: ['./campaign-page.component.css']
})
export class CampaignPageComponent implements OnInit {
  campaignForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient) { }

  ngOnInit(): void {
    this.campaignForm = this.fb.group({
      businessName: ['', Validators.required],
      campaignTheme: ['', Validators.required],
      websiteUrl: ['', [Validators.required, Validators.pattern(/^(http|https):\/\/[^ "]+\.[^ "]+$/)]],
      category: ['', Validators.required],
      budget: ['', Validators.required],
      location: ['', Validators.required],
      language: ['', Validators.required],
      adType: ['', Validators.required],
      adSpaceType: ['', Validators.required],
      file: ['', Validators.required]
    });
 }

 onSubmit(): void {
  if (this.campaignForm.valid) {
    const formData = new FormData();
    Object.keys(this.campaignForm.value).forEach(key => {
      formData.append(key, this.campaignForm.value[key]);
    });

      this.http.post('https://your-backend-url/api/campaigns', formData).subscribe({
      next: response => {
          // Handle success
          console.log('Campaign submitted successfully', response);
          // You can redirect the user or show a success message here
      },
      error: error => {
          // Handle error
          console.error('Error submitting campaign', error);
          // You can show an error message to the user here
      }
      });
  }
}

}
