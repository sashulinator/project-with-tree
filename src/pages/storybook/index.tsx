import { Route, Routes } from 'react-router-dom'

import { Route as IRoute, routes } from './shared/routes'
import React from 'react'

export default function StorybookPage(): JSX.Element {
  const routeList = Object.values(routes) as IRoute[]

  return (
    <main className='StorybookPage'>
      <Routes>
        {routeList.map((route) => {
          return (
            <React.Fragment key={route.path}>
              <Route key={route.path} path={route.path} element={route.element} />
              {route.children &&
                Object.values(route.children).map((route) => {
                  if (route.children) {
                    return (
                      <React.Fragment key={route.path}>
                        <Route key={route.path} path={route.path} element={route.element} />
                        {route.children &&
                          Object.values(route.children).map((route) => {
                            return <Route key={route.path} path={route.path} element={route.element} />
                          })}
                      </React.Fragment>
                    )
                  }
                  return <Route key={route.path} path={route.path} element={route.element} />
                })}
            </React.Fragment>
          )
        })}
      </Routes>
    </main>
  )
}
