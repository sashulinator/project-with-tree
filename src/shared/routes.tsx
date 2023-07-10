import { FC, lazy } from 'react'
import { RouteProps } from 'react-router-dom'

import DecisionListPage from '~/pages/decision'
import DecisionIdPage from '~/pages/decision/id'
import LoginPage from '~/pages/login'
import MainPage from '~/pages/main'
import NotFoundPage from '~/pages/not-found'
import RulesPage from '~/pages/rules/rules'
import SettingsPage from '~/pages/settings'
import Header from '~/ui/header'
import Nav from '~/ui/nav'

const StorybookPage = lazy(() => import('~/pages/storybook'))
const StorybookNav = lazy(() => import('~/pages/storybook/nav'))

export type Route = Omit<RouteProps, 'path'> & {
  Header?: FC
  Nav?: FC
  path: string
  getName: () => string
  getURL: () => string
}

export const routes = {
  main: {
    Header,
    Nav,
    path: '/project-with-tree/main',
    element: <MainPage />,
    getName: () => 'Main',
    getURL(): string {
      return this.path
    },
  },
  decisionList: {
    Header,
    Nav,
    path: '/project-with-tree/decision',
    element: <DecisionListPage />,
    getName: () => 'Decision List',
    getURL(): string {
      return this.path
    },
  },
  rules: {
    Header,
    getName: () => 'Rules',
    path: '/project-with-tree/rules',
    element: <RulesPage />,
    getURL(): string {
      return this.path
    },
  },
  decisionId: {
    path: '/project-with-tree/decision/:id',
    element: <DecisionIdPage />,
    getName: () => 'Decision',
    getURL(): string {
      return this.path
    },
  },
  // Other
  settings: {
    Header,
    Nav,
    path: '/project-with-tree/settings',
    element: <SettingsPage />,
    getName: () => 'Settings',
    getURL(): string {
      return this.path
    },
  },
  login: {
    // Header,
    // Nav,
    path: '/project-with-tree/login',
    element: <LoginPage />,
    getName: () => 'Login',
    getURL(): string {
      return this.path
    },
  },

  storybook: {
    Header,
    Nav: StorybookNav,
    path: '/project-with-tree/storybook/*',
    element: <StorybookPage />,
    getName: () => 'storybook',
    getURL(): string {
      return '/project-with-tree/storybook'
    },
  },

  notFound: {
    Header,
    Nav,
    path: '/project-with-tree/*',
    element: <NotFoundPage />,
    getName: () => 'notFound',
    getURL(): string {
      return '/project-with-tree'
    },
  },
} as const

// eslint-disable-next-line import/no-unused-modules
export default routes as Record<string, Route>
