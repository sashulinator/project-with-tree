import { useLocation } from 'react-router-dom'

import ROUTES from '~/shared/routes'
import { matchPath } from 'react-router'

// eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/no-unsafe-member-access
const projectName = (window as any).projectName as string

if (projectName === undefined) {
  throw new Error('`window.projectName` is undefined')
}

DocumentTitle.displayName = 'app-DocumentTitle'

// Its a component!!
// It could be a hook but it could effect rerenders
export default function DocumentTitle(): null {
  useLocation()
  const routeName = Object.values(ROUTES)
    .find((route) => matchPath(route.path, location.pathname))
    ?.getName()
  const name = routeName ? ` | ${routeName}` : ''
  document.title = `${projectName}${name}`
  return null
}
