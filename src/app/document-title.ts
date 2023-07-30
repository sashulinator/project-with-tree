import { useLocation } from 'react-router-dom'

import ROUTES from '~/shared/routes'
import { matchPath } from 'react-router'

// Its a component!!
// It could be a hook but it could effect rerenders
export default function DocumentTitle(): null {
  useLocation()
  const routeName = Object.values(ROUTES)
    .find((route) => matchPath(route.path, location.pathname))
    ?.getName()
  const name = routeName ? ` | ${routeName}` : ''
  document.title = `Calibri${name}`
  return null
}
