import { Route, Routes } from 'react-router-dom'

import { routes } from './shared/routes'

export default function StorybookPage(): JSX.Element {
  const routeList = Object.values(routes)

  return (
    <main className='StorybookPage'>
      <Routes>
        {routeList.map((route) => {
          return <Route key={route.path} path={route.path} element={route.element} />
        })}
      </Routes>
    </main>
  )
}
