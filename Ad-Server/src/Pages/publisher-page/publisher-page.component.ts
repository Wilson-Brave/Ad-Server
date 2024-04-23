import { Component, OnInit } from '@angular/core';
import { PublisherService, Publisher } from '../../Services/publisher.service';

@Component({
  selector: 'app-publisher-page',
  templateUrl: './publisher-page.component.html',
  styleUrls: ['./publisher-page.component.scss']
})
export class PublisherPageComponent implements OnInit {
  publishers: Publisher[] = [];

  constructor(private publisherService: PublisherService) {}
  
  ngOnInit(): void {
    this.publisherService.getPublishers().subscribe({
      next: (publishers) => {
        this.publishers = publishers;
        console.log(this.publishers); // Check the retrieved publishers
      },
      error: (error) => {
        console.error('Error fetching publishers:', error);
      }
    });
  }
}