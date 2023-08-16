import './index.css'

import { Route, Routes } from 'react-router-dom'

import { Any } from '~/utils/core'

import { routes } from './routes'
import { Config } from './types'
import Page from './ui/page/ui/page'

StorybookPage.displayName = 'page-Storybook'

export default function StorybookPage(): JSX.Element {
  const children = routes.flatMap(([_, ...configs]) => {
    return configs.map((c: unknown) => {
      const config = c as Config<Any>
      const path = config.getPath?.() || `/${config.getName().toLowerCase()}`
      return <Route key={path} path={path} element={<Page key={path} {...config} />} />
    })
  })

  return (
    <main className={StorybookPage.displayName}>
      <Routes>{children}</Routes>
    </main>
  )
}
