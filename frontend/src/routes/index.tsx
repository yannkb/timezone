import { createRoute } from '@tanstack/react-router';
import { TimezoneForm } from '../components/TimezoneForm';
import { TimezoneList } from '../components/TimezoneList';
import { TimezoneConverter } from '../components/TimezoneConverter';
import { Route as rootRoute } from './_root';

export const Route = createRoute({
    getParentRoute: () => rootRoute,
    path: '/',
    component: () => (
        <div>
            <TimezoneConverter />
            <TimezoneForm />
            <TimezoneList />
        </div>
    ),
});