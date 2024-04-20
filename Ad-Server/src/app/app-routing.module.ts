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


const routes: Routes = [
  {path:'', component : HomePageComponent},
  {path:'advertiser', component : AdvertiserPageComponent},
  {path:'publisher', component : PublisherPageComponent},
  {path:'login', component : LoginPageComponent},
  {path:'sign-up', component : SignupPageComponent},
  {path:'admin', component : AdminPageComponent},

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
