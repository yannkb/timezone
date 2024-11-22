import { createRoute } from '@tanstack/react-router';
import { TimezoneDetail } from '../components/TimezoneDetail';
import { Route as rootRoute } from './_root';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/timezone/$id',
  component: TimezoneDetail,
}); 