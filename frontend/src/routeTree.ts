import { Route as rootRoute } from './routes/_root'
import { Route as indexRoute } from './App'

export const routeTree = rootRoute.addChildren([indexRoute])