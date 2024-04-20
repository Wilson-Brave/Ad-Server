import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@auth0/auth0-angular';

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  public profileJson!: string;
  public loggedInUser!: AppUser;

  constructor(public auth: AuthService) {

    try{

    this.auth.user$.subscribe(
      (profile) => {
        this.profileJson = JSON.stringify(profile, null, 2);

        console.log(this.profileJson);

        this.loggedInUser = this.mapToAppUser(profile);
      }
    );

  }catch(e){
    console.log(e);
  }

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
