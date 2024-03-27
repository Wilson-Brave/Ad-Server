// publisher.service.ts

import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { GlobalVariables } from './../../global'; 

@Injectable({
  providedIn: 'root'
})
export class PublisherService { 

  constructor(private http: HttpClient) { }

  getPublishers(): Observable<Publisher[]> {
    return this.http.get<any>(`${GlobalVariables.BASE_API_URL}/Publisher`).pipe(
      map(response => response.value)
    );
  }
}

export interface Publisher {
  PublisherId: number;
  PublisherName: string; 
}
