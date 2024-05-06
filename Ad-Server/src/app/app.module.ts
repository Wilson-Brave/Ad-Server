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
import { BNavItemComponent } from '../Components/sid-nav/nav-item/nav-item.component';
import { HeaderComponent } from '../Components/header/header.component';
import { HomeDashComponent } from '../Pages/home-dash/home-dash.component';
import { WelcomePageComponent } from '../Pages/welcome-page/welcome-page.component';
import { ProfileComponent } from '../Components/profile/profile.component';
import { HttpClientModule } from '@angular/common/http';
import { SignupPageComponent } from '../Pages/signup-page/signup-page.component';
import { LoginPageComponent } from '../Pages/login-page/login-page.component'; 
import { CommonModule } from '@angular/common';
import { MatCommonModule, MatNativeDateModule } from '@angular/material/core';
import { CampaignPageComponent } from '../Pages/campaign-page/campaign-page.component';
import { AdChartsComponent } from '../Components/ui-components/ad-charts/ad-charts.component';
import { AdvertiserHomeComponent } from '../Components/ui-components/advertiser-home/advertiser-home.component';
import { RegisterAdComponent } from '../Components/ui-components/register-ad/register-ad.component';
import { AvatarComponent, AvatarModule, BadgeComponent, BadgeModule, BreadcrumbModule, BreadcrumbRouterComponent, ButtonDirective, ButtonGroupComponent, ButtonGroupModule, CardBodyComponent, CardComponent, CardFooterComponent, CardHeaderComponent, ColComponent, ColorModeService, ContainerComponent, DropdownComponent, DropdownDividerDirective, DropdownHeaderDirective, DropdownItemDirective, DropdownMenuDirective, DropdownModule, DropdownToggleDirective, FormCheckLabelDirective, GridModule, GutterDirective, HeaderModule, HeaderNavComponent, HeaderTogglerDirective, NavItemComponent, NavLinkDirective, NavModule, ProgressBarDirective, ProgressComponent, ProgressModule, RowComponent, ShadowOnScrollDirective, SidebarBrandComponent, SidebarComponent, SidebarFooterComponent, SidebarHeaderComponent, SidebarModule, SidebarNavComponent, SidebarToggleDirective, SidebarTogglerDirective, TableDirective, TextColorDirective, ThemeDirective } from '@coreui/angular';
import { NgScrollbar } from 'ngx-scrollbar';
import { ChartjsModule } from '@coreui/angular-chartjs';
import { IconDirective, IconSetService } from '@coreui/icons-angular';
import { BHeaderComponent } from '../Components/b-header/b-header.component';
import { BSidebarComponent } from '../Components/b-sidebar/b-sidebar.component';
import { AdCampaignsComponent } from '../Components/ui-components/ad-campaigns/ad-campaigns.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    FooterComponent,
    HomePageComponent,
    AdminPageComponent,
    PublisherPageComponent,
    AdvertiserPageComponent,
    RegisterAdComponent,
    AdvertiserHomeComponent,
    LoadingComponent,
    ProfilePageComponent,
    SidNavComponent,
    BNavItemComponent,
    HeaderComponent,
    HomeDashComponent,
    WelcomePageComponent,
    ProfileComponent,
    SignupPageComponent,
    LoginPageComponent,
    AdCampaignsComponent,
    BSidebarComponent,
    BHeaderComponent,

    // AdChartsComponent,
    ProfileComponent,
    CampaignPageComponent,
    AdChartsComponent
  ],

  imports: [
    FormsModule,
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatCommonModule,

    //
    ChartjsModule,
    IconDirective,
    SidebarModule,
      ContainerComponent,
      ShadowOnScrollDirective,
      SidebarBrandComponent,
      SidebarComponent,
      SidebarFooterComponent,
      SidebarHeaderComponent,
      SidebarNavComponent,
      SidebarToggleDirective,
      SidebarTogglerDirective,
      NgScrollbar,

      HeaderModule,
        AvatarComponent,
        BadgeComponent,
        BreadcrumbRouterComponent,
        DropdownComponent,
        DropdownDividerDirective,
        DropdownHeaderDirective,
        DropdownItemDirective,
        DropdownMenuDirective,
        DropdownToggleDirective,
        HeaderNavComponent,
        HeaderTogglerDirective,
        NavLinkDirective,
        ProgressBarDirective,
        ProgressComponent,
        SidebarToggleDirective,
        TextColorDirective,
        ThemeDirective,
        NavModule,
        NavItemComponent,


        ButtonDirective,
        ButtonGroupComponent,
        CardBodyComponent,
        CardComponent,
        CardFooterComponent,
        CardHeaderComponent,
        ColComponent,
        FormCheckLabelDirective,
        GutterDirective,
        RowComponent,
        TableDirective,

    //
    AuthModule.forRoot({
      domain: "dev-wd28w6mdxk7yi6l1.us.auth0.com",
      clientId:"XU8WZVSb7lqHroVerjyWHTjL0kMJX0jP",
      authorizationParams: {
        redirect_uri: window.location.origin,
      },
    }),

    FormsModule,
    MaterialModule,
    ReactiveFormsModule,
    TablerIconsModule.pick(TablerIcons),
    MatNativeDateModule,
  ],

  exports: [TablerIconsModule],
  providers: [IconSetService],
  bootstrap: [AppComponent],

})
export class AppModule {}
