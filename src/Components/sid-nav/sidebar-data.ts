import { NavItem } from './nav-item/nav-item';

export const navItems: NavItem[] = [
  {
    navCap: 'Publsher Zone',
  },
  {
    displayName: 'Campaign',
    iconName: 'bi bi-badge-ad-fill',
    route: 'dashboard/campaigns',
  },
  {
    displayName: 'Charts',
    iconName: 'bi bi-graph-up-arrow',
    route: '/dashboard/charts',
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

