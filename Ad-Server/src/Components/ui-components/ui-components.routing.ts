import { Routes } from '@angular/router';
import { CampaignPageComponent } from '../../Pages/campaign-page/campaign-page.component';
import { AdChartsComponent } from './ad-charts/ad-charts.component';
import { ProfilePageComponent } from '../../Pages/profile-page/profile-page.component';
import { RegisterAdComponent } from './register-ad/register-ad.component';
import { AdvertiserHomeComponent } from './advertiser-home/advertiser-home.component';

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
      },
      {
        path: 'register-advert',
        component: RegisterAdComponent,
      },
      {
        path: 'advertiser-home',
        component: AdvertiserHomeComponent,
      },

    ],
  },
];
