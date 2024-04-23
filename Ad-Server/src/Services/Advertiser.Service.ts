// Advertiser.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalVariables } from './../../global';

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
  AdvertId: number;
  AdvertTypeId: number;
  AdvertiserId: number;
  AdvertName: string;
  AdvertDescription: string;
  MediaFilePath: string;
}
