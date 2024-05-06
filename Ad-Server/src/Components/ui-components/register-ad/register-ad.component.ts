import { AdvertiserService } from './../../../Services/Advertiser.Service';
import { Component, Input, OnInit } from '@angular/core';
import { Advert } from '../../../Services/Advertiser.Service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register-ad',
  templateUrl: './register-ad.component.html',
  styleUrls: ['./register-ad.component.scss']
})

export class RegisterAdComponent implements OnInit {

  @Input() form!: FormGroup;

  ads: Advert[] = [];
  newAdvert: Advert = {
    AdvertId: 0,
    AdvertiserId: 0,
    AdvertName:" New Advert - "+Math.random(),
    AdvertDescription:" ",
    AdvertURL:" ",
    Impressions: 0,
    Clicks: 0,
    TurnOverIndex: 0,
  };

  selectedFile: File = new File([], '', { type: 'text/plain' });

  newAdvertFormGroup = new FormGroup({
    advertName: new FormControl(this.newAdvert.AdvertName, [ Validators.required]),
    advertDescription: new FormControl(this.newAdvert.AdvertDescription, [ Validators.required]),
    advertURL: new FormControl(this.newAdvert.AdvertURL, [ Validators.required]),
    turnOverIndex: new FormControl(this.newAdvert.TurnOverIndex, [ Validators.required, Validators.min(1)]),
  });

  constructor(private adservice: AdvertiserService) {}

  ngOnInit() {
    this.adservice.getAdverts(1).subscribe((adverts) => {
      this.ads = adverts;
    });
  }

  openAdvertModal(advertId: number) {}

  deleteAdvert(advertId: number) {}

  onSubmit() {

    document.getElementById('loader')!.classList.remove('d-none');
    document.getElementById('b-advert-table')!.classList.add('d-none');
    document.getElementById('advertModal')!.classList.add('d-none');

    // Call the addAdvert() method from the service
    this.adservice.postAdvert(this.newAdvert).subscribe(
      (response) => {
        console.log('New advert added successfully:', response);

            document.getElementById('b-advert-table')!.classList.remove('d-none');
            document.getElementById('loader')!.classList.add('d-none');

      },
      (error) => {
        console.error('Error adding new advert:', error);
      }
    );

  }



  showAdvert(show: boolean) {
    const advertModal = document.getElementById('advertModal');
    if (advertModal) {
      if (show) {
        advertModal.classList.remove('d-none');
      } else {
        advertModal.classList.add('d-none');
      }
    }
  }
}
