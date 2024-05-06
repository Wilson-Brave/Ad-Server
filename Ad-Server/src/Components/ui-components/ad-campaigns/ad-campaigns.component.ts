import { Component, OnInit } from '@angular/core';
import {
  AdCampaign,
  AdvertiserService,
} from '../../../Services/Advertiser.Service';

@Component({
  selector: 'app-ad-campaigns',
  templateUrl: './ad-campaigns.component.html',
  styleUrls: ['./ad-campaigns.component.scss'],
})
export class AdCampaignsComponent implements OnInit {
  isLoading: boolean = true;
  AdCampaigns: AdCampaign[] = [];
  AdCampaignNames: String[] = [];
  AdCampaignRevenue: number[] = [];
  selectedCampaign!: AdCampaign;
  barData!: any;

  // constructor() { }
  constructor(private adService: AdvertiserService) {}

  async ngOnInit() {
    console.log('OnInit started!');

    try {
      const campaigns = await this.adService.getAdCampaigns(1).toPromise();

      console.log('OnInit result:');
      console.log(campaigns);

      if (campaigns != undefined) {
        if (campaigns.length > 0) {
          console.log('Assigning the campaigns array to AdCampaigns:');
          this.AdCampaigns = campaigns; // Assigning the campaigns array to AdCampaigns
        } else {
          console.error('No campaigns received or empty array returned.');
        }
      }

      // Select the first campaign
      if (this.AdCampaigns.length > 0) {
        this.AdCampaigns.forEach((c) => {
          this.AdCampaignNames.push(c.CampaignName);
          this.AdCampaignRevenue.push(c.CampaignExpense);
        });

        this.isLoading = false;
      }
    } catch (error) {
      console.error('Error fetching ad campaigns:', error);
    }

    this.barData = {
      labels: this.AdCampaignNames,
      datasets: [
        {
          label: 'Campaing Expense',
          backgroundColor: '#f87979',
          data: this.AdCampaignRevenue,
        },
      ],
    };
  }

  deleteRecord(selectRecord: AdCampaign) {
    console.log('Delete started!');
    this.selectedCampaign = selectRecord;
    document.getElementById('confirmation-dialog')!.classList.remove('d-none');
  }

  async onDeletConfirmation() {
    document.getElementById('confirmation-dialog')!.classList.add('d-none');
    try {
      console.log(`Deleteing Campaign:${this.selectedCampaign.AdCampaignId}`);
      await this.adService.deleteAdCampaign(this.selectedCampaign).toPromise();
    } catch (error) {
      console.error('Error fetching ad campaigns:', error);
      this.isLoading = false;
    }
    await this.refreshCampaigns();
  }
  
  async refreshCampaigns() {
    try {
      const campaigns = await this.adService.getAdCampaigns(1).toPromise();

      console.log('OnInit result:');
      console.log(campaigns);

      if (campaigns != undefined) {
        if (campaigns.length > 0) {
          console.log('Assigning the campaigns array to AdCampaigns:');
          this.AdCampaigns = campaigns; // Assigning the campaigns array to AdCampaigns
        } else {
          console.error('No campaigns received or empty array returned.');
        }
      }
    } catch (error) {
      console.error('Error fetching ad campaigns:', error);
    }
    this.isLoading = true;
  }
}
