import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { AppUser, HomeService } from '../../Services/Home.Service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss'],
})
export class HomePageComponent implements OnInit {
  public loggedInUser!: AppUser;

  constructor(public auth: AuthService, public homeService: HomeService) {}
  ngOnInit() {
    // if (this.auth.isAuthenticated$) {
    //   console.log("True");
    //   this.loggedInUser = this.homeService.loggedInUser;
    // }
  }
}
