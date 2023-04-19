import './layout.css'

import { Route, Routes, matchPath, useLocation } from 'react-router'

import getRootElement from '~/lib/dom/get-root-element'
import { routeList } from '~/shared/routes'

export default function Layout(): null | JSX.Element {
  const location = useLocation()
  const currentRoute = routeList.find((route) => matchPath(route.path, location.pathname))

  getRootElement().className = createLayoutClass(currentRoute)

  return (
    <>
      {currentRoute?.Header && <currentRoute.Header />}
      {currentRoute?.Nav && <currentRoute.Nav />}
      <Routes>
        {routeList.map((route) => {
          return <Route key={route.path} path={route.path} element={route.element} />
        })}
      </Routes>
    </>
  )
}

// Private

function createLayoutClass(currentRoute: undefined | { Header?: unknown; Nav?: unknown }): string {
  const layout = ['main']

  if (currentRoute?.Nav) {
    layout.push('nav')
  }
  if (currentRoute?.Header) {
    layout.push('header')
  }

  return `Layout centered ${layout.sort().join('-')}`
}
