import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
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
  public subAsString!:string;

  constructor(public auth: AuthService, public http: HttpClient) {
    this.auth.user$.subscribe(u => {
        if (this.isUserLoggedIn(`${u?.sub}`)) {
            // User is logged in
            console.log(`Hi ${this.appUser.Given_name}`)
          } else {
            // User is not logged in
            postAdvert(advert: Advert): Observable<any> {

              const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
              return this.http.post<any>(
                `${GlobalVariables.BASE_API_URL}/Advert`,
                advert,
                { headers }

              );

            }
          }
    });
}

isUserLoggedIn(sub: string): Observable<GoogleUserInfo | boolean> {
  return this.http
      .get<any>(`${GlobalVariables.BASE_API_URL}/googleUserInfo/CheckIfUserExists(Sub='${sub}')`)
      .pipe(
          map((response) => {
              const exists = response.value.length > 0;
              this.appUser = response.value.length > 0 ? response.value[0] : null;
              return exists ? response.value[0] : false;
          })
      );
}

  mapToAppUser(profile: any): AppUser {
    return {
      user_id: profile.sub,
      username: profile.nickname,
      picture: profile.picture,
      nickname: profile.nickname,
      phone_number: '', // Add phone_number property if available in your JSON
      app_metadata: '', // Add app_metadata property if available in your JSON
    };
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
}


// {
//   "sub": "google-oauth2|100891320524541831300",
//   "given_name": "Brave Wilson",
//   "family_name": "Kahweka",
//   "nickname": "bravekahweka",
//   "name": "Brave Wilson Kahweka",
//   "picture": "https://lh3.googleusercontent.com/a/ACg8ocKjNHY6qzdB5Ot__sYPjoohKt5ZQ02QwvDeZTeXJbZDifH0TVuq=s96-c",
//   "locale": "en-GB",
//   "updated_at": "2024-04-03T16:36:27.421Z"
// }
