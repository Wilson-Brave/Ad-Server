import { Routes } from '@angular/router';
import { CampaignPageComponent } from '../../Pages/campaign-page/campaign-page.component';
import { AdChartsComponent } from './ad-charts/ad-charts.component';
import { ProfilePageComponent } from '../../Pages/profile-page/profile-page.component';

// ui

export const UiComponentsRoutes: Routes = [
  {
    path: '',
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
      }
    ],
  },
];
