import { FC, lazy } from 'react'
import { RouteProps } from 'react-router-dom'

import DecisionListPage from '~/pages/decision'
import DecisionCreatePage from '~/pages/decision/create'
import DecisionIdPage from '~/pages/decision/id'
import DomainListPage from '~/pages/domain'
import LoginPage from '~/pages/login'
import MainPage from '~/pages/main'
import NotFoundPage from '~/pages/not-found'
import RuleCreatePage from '~/pages/rule/create/create'
import RuleListPage from '~/pages/rule/list/list'
import RuleUpdatePage from '~/pages/rule/update/update'
import SettingsPage from '~/pages/settings'
import Header from '~/ui/header'
import Nav from '~/ui/nav'

const Story = lazy(() => import('~/storybook'))
const StoryNav = lazy(() => import('~/storybook/ui/nav'))

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
    path: '/',
    element: <MainPage />,
    getName: () => 'Main',
    getURL(): string {
      return this.path
    },
  },
  decisionList: {
    Header,
    Nav,
    path: '/decisions',
    element: <DecisionListPage />,
    getName: () => 'Decisions',
    getURL(): string {
      return this.path
    },
  },
  ruleCreate: {
    Header,
    getName: () => 'Create rule',
    path: '/rule/create',
    element: <RuleCreatePage />,
    getURL(): string {
      return this.path
    },
  },
  ruleUpdate: {
    Header,
    getName: () => 'Create Rule',
    path: '/rule/:id',
    element: <RuleUpdatePage />,
    getURL(): string {
      return this.path
    },
  },
  ruleList: {
    Header,
    getName: () => 'Rules',
    path: '/rule',
    element: <RuleListPage />,
    getURL(): string {
      return this.path
    },
  },
  domainList: {
    Header,
    getName: () => 'Domains',
    path: '/domains',
    element: <DomainListPage />,
    getURL(): string {
      return this.path
    },
  },
  decisionCreate: {
    path: '/decision/create',
    element: <DecisionCreatePage />,
    getName: () => 'Create Decision',
    getURL(): string {
      return this.path
    },
  },
  decisionId: {
    path: '/decision/:id',
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
    path: '/settings',
    element: <SettingsPage />,
    getName: () => 'Settings',
    getURL(): string {
      return this.path
    },
  },
  login: {
    // Header,
    // Nav,
    path: '/login',
    element: <LoginPage />,
    getName: () => 'Login',
    getURL(): string {
      return this.path
    },
  },

  storybook: {
    Header,
    Nav: StoryNav,
    path: '/storybook/*',
    element: <Story />,
    getName: () => 'Storybook',
    getURL(): string {
      return '/storybook'
    },
  },

  notFound: {
    Header,
    Nav,
    path: '/*',
    element: <NotFoundPage />,
    getName: () => 'notFound',
    getURL(): string {
      return ''
    },
  },
} as const

// eslint-disable-next-line import/no-unused-modules
export default routes as Record<string, Route>
