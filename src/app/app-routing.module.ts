import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutPageComponent } from '../Pages/about-page/about-page.component';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { ProfilePageComponent } from '../Pages/profile-page/profile-page.component';
import { HomeDashComponent } from '../Pages/home-dash/home-dash.component';
import { PublisherPageComponent } from '../Pages/publisher-page/publisher-page.component';


const routes: Routes = [
  {path:'', component : HomePageComponent},
  {path:'Publisher', component : PublisherPageComponent},
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
