import './index.css'

import { Route, Routes } from 'react-router-dom'

import { routes } from './routes'
import Page from './ui/page/ui/page'

StorybookPage.displayName = 'page-Storybook'

export default function StorybookPage(): JSX.Element {
  const children = routes.flatMap(([_, ...configs]) => {
    return configs.map((config) => {
      return (
        <Route key={config.getPath()} path={config.getPath()} element={<Page key={config.getPath()} {...config} />} />
      )
    })
  })

  return (
    <main className={StorybookPage.displayName}>
      <Routes>{children}</Routes>
    </main>
  )
}
