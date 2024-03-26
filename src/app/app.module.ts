import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

//Import all material modules
import { MaterialModule } from './material.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


// icons
import { TablerIconsModule } from 'angular-tabler-icons';
import * as TablerIcons from 'angular-tabler-icons/icons';

import { AuthModule } from '@auth0/auth0-angular';
import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavBarComponent } from '../Components/nav-bar/nav-bar.component';
import { FooterComponent } from '../Components/footer/footer.component';
import { HomePageComponent } from '../Pages/home-page/home-page.component';
import { AdminPageComponent } from '../Pages/admin-page/admin-page.component';
import { PublisherPageComponent } from '../Pages/publisher-page/publisher-page.component';
import { AdvertiserPageComponent } from '../Pages/advertiser-page/advertiser-page.component';
import { LoadingComponent } from '../Components/loading/loading.component';
import { ProfilePageComponent } from '../Pages/profile-page/profile-page.component';
import { SidNavComponent } from '../Components/sid-nav/sid-nav.component';
import { NavItemComponent } from '../Components/sid-nav/nav-item/nav-item.component';
import { HeaderComponent } from '../Components/header/header.component';
import { HomeDashComponent } from '../Pages/home-dash/home-dash.component';
import { WelcomePageComponent } from '../Pages/welcome-page/welcome-page.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
// import { ProfileComponent } from '../Components/profile/profile.component';
// import { CampaignPageComponent } from '../Pages/campaign-page/campaign-page.component';
// import { AdChartsComponent } from '../Components/ui-components/ad-charts/ad-charts.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomePageComponent,
    AdminPageComponent,
    PublisherPageComponent,
    AdvertiserPageComponent,
    LoadingComponent,
    ProfilePageComponent,
    SidNavComponent,
    NavItemComponent,
    HeaderComponent,
    HomeDashComponent,
    WelcomePageComponent,
    ProfileComponent

    // CampaignPageComponent,
    // AdChartsComponent,
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    // Import the module into the application, with configuration
    AuthModule.forRoot({
      domain: 'dev-hjje0kyvnuofp674.us.auth0.com',
      clientId: 'be8D0jDMjWfaGJz3fGnunKe9YYIUMEfK',
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),

    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    TablerIconsModule.pick(TablerIcons),
  ],
  exports: [TablerIconsModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
