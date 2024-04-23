import { AdvertiserService } from './../../../Services/Advertiser.Service';
import { Component, Input, OnInit } from '@angular/core';
import { Advert } from '../../../Services/Advertiser.Service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-advertiser-home',
  templateUrl: './advertiser-home.component.html',
  styleUrls: ['./advertiser-home.component.scss'],
})


export class AdvertiserHomeComponent implements OnInit {
  @Input() form!: FormGroup;

  ads: Advert[] = [];
  newAdvert: Advert= {
    AdvertId: 0,
    AdvertTypeId: 0,
    AdvertiserId: 0,
    AdvertName: 'asderfdf',
    AdvertDescription: '',
    MediaFile: new File([], '', { type: 'text/plain' })
  };

  selectedFile: File | null = null;


  newAdvertFormGroup = new FormGroup({
    advertName: new FormControl(this.newAdvert.AdvertName,[Validators.required]),
    AdvertDescription: new FormControl(this.newAdvert.AdvertDescription,[Validators.required]),
    AdvertTypeId: new FormControl(this.newAdvert.AdvertTypeId,[Validators.required, Validators.min(1)]),
    mediaFile: new FormControl(this.newAdvert.AdvertTypeId,[Validators.required, Validators.min(1)]),
  });
  constructor(private adservice: AdvertiserService) {}


  ngOnInit() {
    this.adservice.getAdverts(1).subscribe(adverts => {
      this.ads = adverts;
    });

  }

  openAdvertModal(advertId: number) {}

  deleteAdvert(advertId: number) {}

  newAdvertPopUp() {}

  onSubmit() {
    // Call the addAdvert() method from the service
    this.adservice.postAdvert(this.newAdvert).subscribe(response => {
      console.log('New advert added successfully:', response);
    }, error => {
      console.error('Error adding new advert:', error);
    });
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0];

      this.newAdvert.MediaFile = files[0];

      console.log('Selected file:', this.selectedFile);
    }
  }

}
