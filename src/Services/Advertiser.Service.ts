// Advertiser.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalVariables } from './../../global'; 

@Injectable({
  providedIn: 'root'
})

export class AdvertiserService { 

  constructor(private http: HttpClient) { }

  getAdvertisers(): Observable<Advertiser[]> {
    return this.http.get<any>(`${GlobalVariables.BASE_API_URL}/Advertiser`).pipe(
      map(response => response.value)
    );
  }
}

export interface Advertiser {
  AdvertiserId: number;
  AdvertiserName: string; 
}
