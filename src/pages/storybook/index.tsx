import { Route, Routes } from 'react-router-dom'

import { Route as IRoute, routes } from './shared/routes'

export default function StorybookPage(): JSX.Element {
  const routeList = Object.values(routes) as IRoute[]

  return (
    <main className='StorybookPage'>
      <Routes>
        {routeList.map((route) => {
          return (
            <>
              <Route key={route.path} path={route.path} element={route.element} />
              {route.children &&
                Object.values(route.children).map((route) => {
                  return <Route key={route.path} path={route.path} element={route.element} />
                })}
            </>
          )
        })}
      </Routes>
    </main>
  )
}
