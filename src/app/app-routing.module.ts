import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from '../Components/Pages/about-page/about-page.component';
import { HomePageComponent } from '../Components/Pages/home-page/home-page.component';
import { ProfilePageComponent } from '../Components/Pages/profile-page/profile-page.component';
import { HomeDashComponent } from '../Components/Pages/home-dash/home-dash.component';


const routes: Routes = [
  // {path:'', component : HomePageComponent},
  {path:'Dashboard', component : HomeDashComponent},
  {path:'Profile', component : ProfilePageComponent},
  {path:'About', component : AboutPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
