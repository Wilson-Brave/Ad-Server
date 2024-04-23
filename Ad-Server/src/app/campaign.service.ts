import { Injectable } from '@angular/core';
import { Campaign } from './Models/campaign';

@Injectable({
  providedIn: 'root'
})
export class CampaignService {

  constructor() { }

  submitCampaign(campaign: Campaign) {
    console.log('Submitting campaign:', campaign);
    // Here you would send a request to your backend
  }
}
