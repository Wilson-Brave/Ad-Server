// Advertiser.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalVariables } from './../../global';
import { DateSelectionModelChange } from '@angular/material/datepicker';

@Injectable({
  providedIn: 'root',
})
export class AdvertiserService {
  constructor(private http: HttpClient) {}

  getAdvertisers(): Observable<Advertiser[]> {
    return this.http
      .get<any>(`${GlobalVariables.BASE_API_URL}/Advertiser`)
      .pipe(map((response) => response.value));
  }

  getAdverts(advertiserId: number): Observable<Advert[]> {
    return this.http
      .get<any>(
        `${GlobalVariables.BASE_API_URL}/Advert/AdvertByAdvertiser(AdvertiserId=${advertiserId})`
      )
      .pipe(map((response) => response.value));
  }

  getAdvertsByCampaign(CampaignId: number): Observable<Advert[]> {
    return this.http
      .get<any>(
        `${GlobalVariables.BASE_API_URL}/Advert/AdvertsByCampaign(CampaignId=${CampaignId})`
      )
      .pipe(map((response) => response.value));
  }

  getAdCampaigns(advertiserId: number): Observable<AdCampaign[]> {
      // console.log("fetching Ad Campaigns !");
      return this.http
      .get<any>(
        `${GlobalVariables.BASE_API_URL}/AdCampaign/AdCampaignByAdvertiser(AdvertiserId=${advertiserId})`
      )
      .pipe(map((response) => response.value));
  }

  deleteAdCampaign(adCampaign: AdCampaign): Observable<any[]> {
    return this.http
    .delete<any>(
      `${GlobalVariables.BASE_API_URL}/AdCampaign(${adCampaign.AdCampaignId})`
    )
    .pipe(map((response) => response.value));
}

  getAdCampaignAdvert(advertiserId: number): Observable<AdCampaignAdvert[]> {
    // console.log("fetching Ad Campaigns !");
    return this.http
    .get<any>(
      `${GlobalVariables.BASE_API_URL}/AdCampaignAdvert/AdCampaignAdvertByAdvertiser(AdvertiserId=${advertiserId})`
    )
    .pipe(map((response) => response.value));
}


  getAdvert(advertiserId: number): Observable<Advert> {
    return this.http
      .get<any>(`${GlobalVariables.BASE_API_URL}/Advert(${advertiserId})`)
      .pipe(map((response) => response.value));
  }

  // Method to add a new advert
  postAdvert(advert: Advert): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${GlobalVariables.BASE_API_URL}/Advert`,
      advert,
      { headers }
    );
  }

  // Method to add a new advert
  postAdvertMedia(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('File', file);

    return this.http.post<any>(
      `${GlobalVariables.BASE_API_URL}/Advert/UploadFile`,
      formData
    );
  }
}

export interface Advertiser {
  AdvertiserId: number;
  AdvertiserName: string;
}

export interface Advert {
   AdvertId:number;
   AdvertiserId:number;
   AdvertName:string;
   AdvertDescription:string;
   AdvertURL:string;
   Impressions:number;
   Clicks:number;
   TurnOverIndex:number;

}

export interface AdCampaign {
  AdCampaignId: number;
  AdvertiserId: number;
  CampaignName: String;
  StartDate: Date;
  EndDate: Date;
  CampaignFund:number;
  CampaignExpense: number;
  CampaignReserves: number;
}

export interface AdCampaignAdvert {
  AdCampaignAdvertId: number;
  CampaignId: number;
  AdvertId: number;
}
