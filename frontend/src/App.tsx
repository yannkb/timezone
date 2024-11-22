import { createRoute } from '@tanstack/react-router';
import { TimezoneForm } from './components/TimezoneForm';
import { TimezoneList } from './components/TimezoneList';
import { Route as rootRoute } from './routes/_root';

export const Route = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: () => (
    <div>
      <TimezoneForm />
      <TimezoneList />
    </div>
  ),
});