import { Subscription } from 'rxjs';
import { AdCampaign, Advert } from './../../../Services/Advertiser.Service';
import { Component, OnInit } from '@angular/core';
import { AdvertiserService } from '../../../Services/Advertiser.Service';

@Component({
  selector: 'app-advertiser-home',
  templateUrl: './advertiser-home.component.html',
  styleUrls: ['./advertiser-home.component.scss'],
})
export class AdvertiserHomeComponent implements OnInit {
  AdCampaigns: AdCampaign[] = [];
  SelectedCampaignAds: Advert[] = [];
  CampaignNames: String[] = [];
  AdvertNames: String[] = [];
  CampaignClicks: number[] = [];
  CampaignImpressions: number[] = [];
  selectedCampaign!: AdCampaign;
  data!: any;
  isLoading: boolean = true;
  firstload: boolean = true;

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
          this.AdCampaigns = [];
          this.AdCampaigns = campaigns; // Assigning the campaigns array to AdCampaigns
        } else {
          console.error('No campaigns received or empty array returned.');
        }
      }

      // Iterate through the campaigns and extract their names
      this.AdCampaigns.forEach((campaign) => {
        console.log('Names: ' + campaign.CampaignName);
        this.CampaignNames.push(campaign.CampaignName);
      });

      // Select the first campaign
      if (this.AdCampaigns.length > 0) {
        if(this.firstload){
          this.selectedCampaign = this.AdCampaigns[0];
        }

        const campaignAds = await this.adService
          .getAdvertsByCampaign(this.selectedCampaign.AdCampaignId)
          .toPromise();
        if (campaignAds != undefined) {
          if (campaignAds.length > 0) {
            this.SelectedCampaignAds = campaignAds; // Assigning the campaigns array to AdCampaigns
          } else {
            console.error('No campaigns received or empty array returned.');
          }

          console.log(campaignAds);

          campaignAds.forEach((ad) => {
            this.AdvertNames.push(ad.AdvertName);
            this.CampaignClicks.push(ad.Clicks);
            this.CampaignImpressions.push(ad.Impressions);
          });
        }

        this.isLoading = false;
      }
    } catch (error) {
      console.error('Error fetching ad campaigns:', error);
    }


    this.data = {
      labels: this.AdvertNames,
      datasets: [
        {
          label: 'Impressions',
          backgroundColor: 'rgba(220, 220, 220, 0.2)',
          borderColor: 'rgba(220, 220, 220, 1)',
          pointBackgroundColor: 'rgba(220, 220, 220, 1)',
          pointBorderColor: '#fff',
          data: this.CampaignImpressions,
        },
        {
          label: 'Clicks',
          backgroundColor: 'rgba(151, 187, 205, 0.2)',
          borderColor: 'rgba(151, 187, 205, 1)',
          pointBackgroundColor: 'rgba(151, 187, 205, 1)',
          pointBorderColor: '#fff',
          data: this.CampaignClicks,
        },
      ],
    };


  }

  campaingChange(newCampaign: AdCampaign) {
    this.isLoading = true;
    // Simulate an asynchronous operation (e.g., fetching data) with setTimeout
    this.resetDataHolder();
    this.firstload = false;
    setTimeout(async () => {
      this.selectedCampaign = newCampaign;
      await this.ngOnInit();
      this.isLoading = false;
    }, 1000); // Adjust the timeout duration as needed
  }

  //Calculate Days to go

  daysToGo(selectedEndDate: Date): number {
    // Assuming selectedCampaign.EndDate is a Date object
    const currentDate = new Date();
    const endDate = new Date(selectedEndDate);
    const differenceInTime = endDate.getTime() - currentDate.getTime();
    const differenceInDays = Math.ceil(differenceInTime / (1000 * 3600 * 24));
    return differenceInDays;
  }



  handleChartRef($chartRef: any) {
    if ($chartRef) {
      console.log('handleChartRef', $chartRef);
      this.data.labels.push('N/A');
      this.data.datasets[0].data.push(60);
      this.data.datasets[1].data.push(20);
      setTimeout(() => {
        $chartRef?.update();
      }, 3000);
    }
  }

  resetDataHolder() {
    this.AdCampaigns = [];
    this.SelectedCampaignAds = [];
    this.CampaignNames = [];
    this.AdvertNames = [];
    this.CampaignClicks = [];
    this.CampaignImpressions = [];
  }
}
