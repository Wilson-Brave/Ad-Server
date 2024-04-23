import { AdvertiserService } from './../../../Services/Advertiser.Service';
import { Component, Input, OnInit } from '@angular/core';
import { Advert } from '../../../Services/Advertiser.Service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-advertiser-home',
  templateUrl: './advertiser-home.component.html',
  styleUrls: ['./advertiser-home.component.scss'],
})
export class AdvertiserHomeComponent implements OnInit {

  @Input() form!: FormGroup;

  ads: Advert[] = [];
  newAdvert: Advert = {
    AdvertId: 0,
    AdvertTypeId: 1,
    AdvertiserId: 0,
    AdvertName: 'new Advert',
    AdvertDescription: '',
    MediaFilePath: '',
  };

  selectedFile: File = new File([], '', { type: 'text/plain' });


  constructor(private adservice: AdvertiserService, private http: HttpClient) {}

  ngOnInit() {
    this.adservice.getAdverts(1).subscribe((adverts) => {
      this.ads = adverts;
    });
  }
}
