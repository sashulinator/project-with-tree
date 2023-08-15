import { Route, Routes } from 'react-router-dom'

import { routes } from './routes'
import Page from './ui/page/ui/page'

export default function StorybookPage(): JSX.Element {
  const children = routes.flatMap(([_, ...configs]) => {
    return configs.map((config) => {
      return (
        <Route
          key={config.getPath()}
          path={config.getPath()}
          element={<Page key={config.getPath()} controls={config.controls} element={config.element} />}
        />
      )
    })
  })

  return (
    <main className='StorybookPage'>
      <Routes>{children}</Routes>
    </main>
  )
}
