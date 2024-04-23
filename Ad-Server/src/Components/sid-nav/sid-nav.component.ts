import { NavService } from './../../app/Services/nav.service';
import { Component, OnInit } from '@angular/core';
import { navItems } from './sidebar-data';

@Component({
  selector: 'app-sid-nav',
  templateUrl: './sid-nav.component.html',
  styleUrls: ['./sid-nav.component.scss']
})
export class SidNavComponent implements OnInit {
  navItems = navItems;

  constructor(public navService: NavService) {}

  ngOnInit(): void {}

}
