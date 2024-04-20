import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Advertiser',
  },
  {
    displayName: 'Home',
    iconName: 'bi bi-badge-house-door',
    route: 'dashboard/advertiser-home',
  },
  {
    displayName: 'Reister Ads',
    iconName: 'bi bi-badge-ad-fill',
    route: 'dashboard/register-advert',
  },
  {
    displayName: 'Ad-Campaigns',
    iconName: 'bi bi-megaphone',
    route: '/dashboard/ad-campaign',
  },
  {
    displayName: 'Funding',
    iconName: 'bi bi-coin',
    route: '/dashboard/ad-funds',
  },
  {
    navCap: 'Auth',
  },
  {
    displayName: 'Profile',
    iconName: 'bi bi-person-circle',
    route: '/authentication/register',
  },
  {
    displayName: 'Log-Out',
    iconName: 'bi bi-box-arrow-in-right',
    route: '/authentication/register',
    RouteCode: 69,
  },
];

