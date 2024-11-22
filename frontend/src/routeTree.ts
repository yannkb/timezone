import { Route as rootRoute } from './routes/_root'
import { Route as indexRoute } from './routes/index'
import { Route as timezoneDetailRoute } from './routes/timezone.$id'

export const routeTree = rootRoute.addChildren([indexRoute, timezoneDetailRoute])