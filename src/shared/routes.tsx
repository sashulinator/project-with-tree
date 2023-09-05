import { FC, lazy } from 'react'
import { RouteProps } from 'react-router-dom'

import DecisionListPage from '~/pages/decision'
import DecisionCreatePage from '~/pages/decision/create'
import DecisionIdPage from '~/pages/decision/id'
import DomainListPage from '~/pages/domain/domain-list/domain-list'
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
  ruleCreate: {
    Header,
    getName: () => 'Create rule',
    path: '/project-with-tree/rule/create',
    element: <RuleCreatePage />,
    getURL(): string {
      return this.path
    },
  },
  ruleUpdate: {
    Header,
    getName: () => 'Create rule',
    path: '/project-with-tree/rule/update/:id',
    element: <RuleUpdatePage />,
    getURL(): string {
      return this.path
    },
  },
  ruleList: {
    Header,
    getName: () => 'List rule',
    path: '/project-with-tree/rule/list',
    element: <RuleListPage />,
    getURL(): string {
      return this.path
    },
  },
  domainList: {
    Header,
    getName: () => 'List rule',
    path: '/project-with-tree/domain/list',
    element: <DomainListPage />,
    getURL(): string {
      return this.path
    },
  },
  decisionCreate: {
    path: '/project-with-tree/decision/create',
    element: <DecisionCreatePage />,
    getName: () => 'Decision',
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
    Nav: StoryNav,
    path: '/project-with-tree/storybook/*',
    element: <Story />,
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
