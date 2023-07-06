import './layout.css'

import { useLayoutEffect } from 'react'
import { Route as RRRoute, Routes, matchPath, useLocation } from 'react-router'

import getRootElement from '~/lib/dom/get-root-element'
import { emitter } from '~/shared/emitter'
import { Route, routes } from '~/shared/routes'
import { useForceUpdate } from '~/utils/hooks'

export default function Layout(): null | JSX.Element {
  const update = useForceUpdate()

  const location = useLocation()
  const routeList = Object.values(routes)
  const currentRoute: Route | undefined = routeList.find((route) => matchPath(route.path, location.pathname))

  getRootElement().className = createLayoutClass(currentRoute)

  useLayoutEffect(() => {
    emitter.on('addRoutes', (newRoutes) => {
      Object.assign(routes, newRoutes)
      update()
    })
  }, [])

  return (
    <>
      {currentRoute?.Header && <currentRoute.Header />}
      {currentRoute?.Nav && <currentRoute.Nav />}
      <Routes>
        {routeList.map((route) => {
          return <RRRoute key={route.path} path={route.path} element={route.element} />
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
