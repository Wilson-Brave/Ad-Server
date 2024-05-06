import { GoogleUserInfo } from './Home.Service';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';
import { GlobalVariables } from './../../global';
import { Observable, map, Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public profileJson!: string;
  public loggedInUser!: AppUser;
  public appUser!: GoogleUserInfo;
  public subAsString!: string;

  constructor(public auth: AuthService, public http: HttpClient) {
    console.log(`User Authentication Started !`);

    this.auth.user$.subscribe((u) => {
      console.log();

      if (u) {
        const sub = u.sub || '';
        this.isUserLoggedIn(sub).subscribe((existsOrUser) => {
          if (typeof existsOrUser === 'boolean') {
            // User is not logged in
            console.log(`logging in started !`);

            this.appUser.Given_name = u!.given_name || '';
            this.appUser.Family_name = u!.family_name || '';
            this.appUser.Nickname = u!.nickname || '';
            this.appUser.Name = u!.name || '';
            this.appUser.Picture = u!.picture || '';
            this.appUser.Locale = u!.locale || '';
            this.appUser.Updated_at = new Date(u?.updated_at || '');
            this.appUser.Email = u!.email || '';
            this.appUser.Email_verified = u!.email_verified || false;
            this.appUser.Sub = u!.sub || '';

            this.postGoogleUser(this.appUser).subscribe(() => {
              console.log(`Hi ${this.appUser.Given_name}`);
            });

          } else {
            // User is logged in
            console.log(`Hi ${existsOrUser.Given_name}`);
          }
        });
      }
    });
  }

  postGoogleUser(appUser: GoogleUserInfo): Observable<any> {
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<any>(
      `${GlobalVariables.BASE_API_URL}/GoogleUserInfo`,
      appUser,
      { headers }
    );
  }

  async isUserLoggedIn(sub: string): Promise<Observable<GoogleUserInfo>> {

    console.log('Checking if user Exists !');
    try{
    var x = this.http
      .get<any>(
        `${GlobalVariables.BASE_API_URL}/googleUserInfo/CheckIfUserExists(Sub='${sub}')`
      )
      .pipe(map((response) => response.value));

      var user = this.http
      .get<any>(
        `${GlobalVariables.BASE_API_URL}/GoogleUserInfo(${sub})`
      )
      .pipe(map((response) => response.value));

      return user;

    }
    catch(error){
      console.log(error);

      throw error;
    }
  }
}

export interface AppUser {
  user_id: string;
  username: string;
  picture: string;
  nickname: string;
  phone_number: string;
  app_metadata: string;
}

export interface GoogleUserInfo {
  GoogleUserInfoId: number;
  Given_name: string;
  Family_name: string;
  Nickname: string;
  Name: string;
  Picture: string;
  Locale: string;
  Updated_at: Date;
  Email: string;
  Email_verified: boolean;
  Sub: string;
  Account_Verified: boolean;
}
