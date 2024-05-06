import { ProfileComponent } from './../Components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from '../Pages/about-page/about-page.component';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { ProfilePageComponent } from '../Pages/profile-page/profile-page.component';
import { HomeDashComponent } from '../Pages/home-dash/home-dash.component';
import { PublisherPageComponent } from '../Pages/publisher-page/publisher-page.component';
import {AdvertiserPageComponent} from '../Pages/advertiser-page/advertiser-page.component';
import { AdminPageComponent } from '../Pages/admin-page/admin-page.component';
import { LoginPageComponent } from '../Pages/login-page/login-page.component';
import { SignupPageComponent } from '../Pages/signup-page/signup-page.component';
import { CampaignPageComponent } from '../Pages/campaign-page/campaign-page.component';
import { AdChartsComponent } from '../Components/ui-components/ad-charts/ad-charts.component';
import { RegisterAdComponent } from '../Components/ui-components/register-ad/register-ad.component';
import { AdvertiserHomeComponent } from '../Components/ui-components/advertiser-home/advertiser-home.component';
import { AdCampaignsComponent } from '../Components/ui-components/ad-campaigns/ad-campaigns.component';


const routes: Routes = [
  {path:'', component : HomePageComponent},
  {path:'advertiser', component : AdvertiserPageComponent},
  {path:'publisher', component : PublisherPageComponent},
  {path:'login', component : LoginPageComponent},
  {path:'sign-up', component : SignupPageComponent},
  {path:'admin', component : AdminPageComponent},

  {
    path:'dashboard', component : HomeDashComponent,
    children: [

      {
        path: 'campaigns',
        component: CampaignPageComponent,
      },
      {
        path: 'charts',
        component: AdChartsComponent,
      },
      {
        path: 'Profile',
        component: ProfilePageComponent,
      },
      {
        path: 'register-advert',
        component: RegisterAdComponent,
      },
      {
        path: 'advertiser-home',
        component: AdvertiserHomeComponent,
      },
      {
        path: 'Ad-Campaigns',
        component: AdCampaignsComponent,
      },
      {
        path: 'Profile',
        component: ProfileComponent,
      },

  ]
},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
