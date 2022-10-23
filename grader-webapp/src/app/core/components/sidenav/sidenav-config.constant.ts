import { SidenavItemModel } from './sidenav-item.model';

export const SIDENAV_CONFIG: readonly SidenavItemModel[] = [
  {
    iconName: 'person',
    path: 'user',
  },
  {
    labelTranslation: 'sidenav.home',
    iconName: 'dashboard',
    path: 'home',
  },
  {
    labelTranslation: 'sidenav.configuration',
    iconName: 'settings',
    path: 'configuration',
  },
];
