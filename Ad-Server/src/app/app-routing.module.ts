import { ProfileComponent } from './../Components/profile/profile.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from '../Pages/about-page/about-page.component';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { ProfilePageComponent } from '../Pages/profile-page/profile-page.component';
import { HomeDashComponent } from '../Pages/home-dash/home-dash.component';
import { PublisherPageComponent } from '../Pages/publisher-page/publisher-page.component';
import { CampaignPageComponent } from '../Pages/campaign-page/campaign-page.component';
import { AdChartsComponent } from '../Components/ui-components/ad-charts/ad-charts.component';
import { RegisterAdComponent } from '../Components/ui-components/register-ad/register-ad.component';
import { AdvertiserHomeComponent } from '../Components/ui-components/advertiser-home/advertiser-home.component';


const routes: Routes = [
  {path:'', component : HomePageComponent},
  {path:'Publisher', component : PublisherPageComponent},
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
