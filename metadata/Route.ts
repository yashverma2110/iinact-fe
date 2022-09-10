import { RouteMetadata } from '../types/RouteMetadata';
import {
  faHouse,
  faTableList,
  faChartPie,
  faRightFromBracket,
} from '@fortawesome/free-solid-svg-icons';

const Routes: RouteMetadata[] = [
  {
    route: '/home',
    displayName: 'Home',
    icon: faHouse,
  },
  {
    route: '/list',
    displayName: 'Lists',
    icon: faTableList,
  },
  {
    route: '/dashboard',
    displayName: 'Report',
    icon: faChartPie,
  },
  {
    route: '/logout',
    displayName: 'Logout',
    icon: faRightFromBracket,
  },
];

export default Routes;
