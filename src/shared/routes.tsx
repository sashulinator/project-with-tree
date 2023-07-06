import { FC, lazy } from 'react'
import { RouteProps } from 'react-router-dom'

import DecisionListPage from '~/pages/decision'
import DecisionIdPage from '~/pages/decision/id'
import LoginPage from '~/pages/login'
import MainPage from '~/pages/main'
import NotFoundPage from '~/pages/not-found'
import SettingsPage from '~/pages/settings'
import Header from '~/ui/header'
import Nav from '~/ui/nav'

const StorybookPage = lazy(() => import('~/pages/storybook'))

export type Route = Omit<RouteProps, 'path'> & {
  Header?: FC
  Nav?: FC
  getName: () => string
  path: string
}

export const routes = {
  main: {
    Header,
    Nav,
    getName: () => 'Main',
    path: '/project-with-tree/main',
    element: <MainPage />,
  },
  decisionList: {
    Header,
    Nav,
    getName: () => 'Decision List',
    path: '/project-with-tree/decision',
    element: <DecisionListPage />,
  },
  decisionId: {
    getName: () => 'Decision',
    path: '/project-with-tree/decision/:id',
    element: <DecisionIdPage />,
  },
  // Other
  settings: {
    Header,
    Nav,
    getName: () => 'Settings',
    path: '/project-with-tree/settings',
    element: <SettingsPage />,
  },
  login: {
    // Header,
    // Nav,
    getName: () => 'Login',
    path: '/project-with-tree/login',
    element: <LoginPage />,
  },
  notFound: {
    Header,
    Nav,
    getName: () => 'notFound',
    path: '/project-with-tree/*',
    element: <NotFoundPage />,
  },

  storybook: {
    Header,
    Nav,
    getName: () => 'storybook',
    path: '/project-with-tree/storybook/*',
    element: <StorybookPage />,
  },
} as const

// eslint-disable-next-line import/no-unused-modules
export default routes as Record<string, Route>
