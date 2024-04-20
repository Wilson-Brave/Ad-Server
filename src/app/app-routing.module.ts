import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { HomeDashComponent } from '../Pages/home-dash/home-dash.component';
import { AboutPageComponent } from '../Pages/about-page/about-page.component';
import { ProfilePageComponent } from '../Pages/profile-page/profile-page.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomePageComponent },
  { path: 'about', component: AboutPageComponent },
  { path: 'profile', component: ProfilePageComponent },
  {
    path: 'dashboard',
    component: HomeDashComponent,
    children: [
      {
        path: 'ui-components',
        loadChildren: () =>
          import('../Components/ui-components/ui-components.module').then(m => m.UicomponentsModule),
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
