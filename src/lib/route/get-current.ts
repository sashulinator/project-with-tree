import { Location, matchPath } from 'react-router-dom'

import { Route, routes } from '~/shared/routes'

export function getCurrent(location: Location): Route {
  const route = Object.values(routes).find((route) => matchPath(route.path, location.pathname))
  return route === undefined ? routes.notFound : route
}
