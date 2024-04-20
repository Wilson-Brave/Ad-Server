import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-publisher-page',
  templateUrl: './publisher-page.component.html',
  styleUrls: ['./publisher-page.component.scss']
})
export class PublisherPageComponent implements OnInit {
currentEarnings: any;
projectedEarnings: any;
earningsTrendData: any;
earningsTrendOptions: any;
topAdUnitsData: any;
topAdUnitsOptions: any;
underperformingAlerts: any;

  constructor() { }

  ngOnInit() {
  }

}
