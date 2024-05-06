import { AuthService } from '@auth0/auth0-angular';
import { NavService } from './../../app/Services/nav.service';
import { Component, OnInit } from '@angular/core';
import {
  navItemsAdmin,
  navItemsAdvertiser,
  navItemsPublister,
} from './sidebar-data';

@Component({
  selector: 'app-sid-nav',
  templateUrl: './sid-nav.component.html',
  styleUrls: ['./sid-nav.component.scss'],
})
export class SidNavComponent implements OnInit {
  navItemsAdmin = navItemsAdmin;
  navItemsPublisher = navItemsPublister;
  navItemsAdvertiser = navItemsAdvertiser;
  navItems!: any;

  constructor(public navService: NavService, private auth: AuthService) {}

  ngOnInit(): void {
    this.auth.user$.subscribe(
      (profile) => (this.profileJson = JSON.stringify(profile, null, 2))
    );
  }
}
