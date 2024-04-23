import { AdvertiserService } from './../../../Services/Advertiser.Service';
import { Component, Input, OnInit } from '@angular/core';
import { Advert } from '../../../Services/Advertiser.Service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

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
    AdvertTypeId: 0,
    AdvertiserId: 1,
    AdvertName: 'new Advert',
    AdvertDescription: '',
    MediaFilePath: '',
  };

  selectedFile: File = new File([], '', { type: 'text/plain' });

  newAdvertFormGroup = new FormGroup({
    advertName: new FormControl(this.newAdvert.AdvertName, [
      Validators.required,
    ]),
    AdvertDescription: new FormControl(this.newAdvert.AdvertDescription, [
      Validators.required,
    ]),
    AdvertTypeId: new FormControl(this.newAdvert.AdvertTypeId, [
      Validators.required,
      Validators.min(1),
    ]),
    MediaFilePath: new FormControl(this.newAdvert.MediaFilePath),
  });

  constructor(private adservice: AdvertiserService, private http: HttpClient) {}

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

        // this.adservice.postAdvertMedia(this.selectedFile).subscribe(
        //   (response) => {
        //     console.log('New advert added successfully:', response);

        //     this.adservice.getAdverts(1).subscribe((adverts) => {
        //       this.ads = adverts;
        //     });

            document.getElementById('b-advert-table')!.classList.remove('d-none');
            document.getElementById('loader')!.classList.add('d-none');

        //   },
        //   (error) => {
        //     console.error('Error adding new advert:', error);
        //   }
        // );
      },
      (error) => {
        console.error('Error adding new advert:', error);
      }
    );

  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.selectedFile = files[0];

      this.newAdvert.MediaFilePath = files[0].path;

      console.log('Selected file:', this.newAdvert.MediaFilePath);
    }
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

  // onFileSelected(event: any) {
  //   const files = event.target.files;
  //   if (files.length > 0) {
  //     const file = files[0];
  //     const fileName = file.name;

  //     // Define the path where you want to save the file inside the assets folder
  //     const folderPath = 'images/ads/';

  //     // Create a new FileReader instance to read the file content
  //     const reader = new FileReader();
  //     reader.onload = (event: any) => {
  //       // File content loaded, now write it to the assets folder
  //       const fileContent = event.target.result;
  //       const filePath = `assets/${folderPath}${fileName}`;

  //       // Write the file content to the assets folder
  //       this.http.put(filePath, fileContent).subscribe(
  //         (response) => {
  //           // File saved successfully
  //           console.log('File saved at:', filePath);

  //           // Update the MediaFilePath property with the relative file path
  //           this.newAdvert.MediaFilePath = filePath;
  //         },
  //         (error) => {
  //           console.error('Error saving file:', error);
  //         }
  //       );
  //     };

  //     // Read the file content
  //     reader.readAsDataURL(file);
  //   }
  // }
}
