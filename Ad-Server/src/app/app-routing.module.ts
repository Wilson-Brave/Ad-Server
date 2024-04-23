import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from '../Pages/about-page/about-page.component';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { ProfilePageComponent } from '../Pages/profile-page/profile-page.component';
import { HomeDashComponent } from '../Pages/home-dash/home-dash.component';


// For publisher
import { PublisherPageComponent } from '../Pages/publisher-page/publisher-page.component';
import { PublisherAdsPageComponent } from '../Pages/publisher-ads-page/publisher-ads-page.component';
import { SitesPageComponent } from '../Pages/sites-page/sites-page.component';

//For Advertiser
import {AdvertiserPageComponent} from '../Pages/advertiser-page/advertiser-page.component';
import { CampaignPageComponent } from '../Pages/campaign-page/campaign-page.component';
import { AnalyticsPageComponent } from '../Pages/analytics-page/analytics-page.component';

// For Admin
import { AdminPageComponent } from '../Pages/admin-page/admin-page.component';
import { AdManagementComponent } from '../Pages/ad-management/ad-management.component';
import { UsersPageComponent } from '../Pages/users-page/users-page.component';

// Auth pages
import { LoginPageComponent } from '../Pages/login-page/login-page.component';
import { SignupPageComponent } from '../Pages/signup-page/signup-page.component';



const routes: Routes = [
  {path:'', component : HomePageComponent},

  // Advertiser 
  {path:'advertiser', component : AdvertiserPageComponent},
  {path:'campaign', component : CampaignPageComponent},
  {path:'analytics', component : AnalyticsPageComponent},

  {path:'publisher', component : PublisherPageComponent},
  {path:'ads', component : PublisherAdsPageComponent},
  {path:'sites', component : SitesPageComponent},

  {path:'login', component : LoginPageComponent},
  {path:'sign-up', component : SignupPageComponent},

  {path:'admin', component : AdminPageComponent},
  {path:'ad-management', component : AdManagementComponent},
  {path:'users', component : UsersPageComponent},


  {
    path:'', component : HomeDashComponent,
    children: [
    {
      path: 'dashboard',
      loadChildren: () =>
        import('../Components/ui-components/ui-components.module').then(
          (m) => m.UicomponentsModule
        ),
    },
  ]
},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
