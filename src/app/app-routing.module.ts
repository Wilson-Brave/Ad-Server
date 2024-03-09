import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from '../Pages/about-page/about-page.component';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { ProfilePageComponent } from '../Pages/profile-page/profile-page.component';
import { HomeDashComponent } from '../Pages/home-dash/home-dash.component';


const routes: Routes = [
  {path:'', component : HomePageComponent},
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
  {path:'Profile', component : ProfilePageComponent},
  {path:'About', component : AboutPageComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
