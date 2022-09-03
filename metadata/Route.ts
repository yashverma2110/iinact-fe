import { RouteMetadata } from '../types/RouteMetadata';
import {
  faHouse,
  faTableList,
  faChartPie,
} from '@fortawesome/free-solid-svg-icons';

const Routes: RouteMetadata[] = [
  {
    route: '/home',
    displayName: 'Home',
    icon: faHouse,
  },
  {
    route: '/list',
    displayName: 'All lists',
    icon: faTableList,
  },
  {
    route: '/dashboard',
    displayName: 'Track progress',
    icon: faChartPie,
  },
];

export default Routes;
