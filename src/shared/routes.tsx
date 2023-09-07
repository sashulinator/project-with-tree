import { FC, lazy } from 'react'
import { RouteObject } from 'react-router-dom'

import DecisionListPage from '~/pages/decisions'
import DecisionCreatePage from '~/pages/decisions/create'
import DecisionIdPage from '~/pages/decisions/id'
import DomainListPage from '~/pages/domains'
import LoginPage from '~/pages/login'
import MainPage from '~/pages/main'
import NotFoundPage from '~/pages/not-found'
import RuleCreatePage from '~/pages/rules/create/create'
import RuleListPage from '~/pages/rules/list/list'
import RuleUpdatePage from '~/pages/rules/update/update'
import SettingsPage from '~/pages/settings'
import TreePage from '~/pages/tree'
import Header from '~/ui/header'
import Nav from '~/ui/nav'

const Story = lazy(() => import('~/storybook'))
const StoryNav = lazy(() => import('~/storybook/ui/nav'))

export type Route = Omit<RouteObject, 'children' | 'path'> & {
  path: string
  Header?: FC
  Nav?: FC
  getName: () => string
  getURL: () => string
}

export const routes = {
  main: {
    path: '/',
    getURL: (): string => routes.main.path,
    getName: (): string => 'Main',
    element: <MainPage />,
    Header,
    Nav,
  },
  decisionList: {
    path: '/decisions',
    getURL: (): string => routes.decisionList.path,
    getName: (): string => 'Decisions',
    element: <DecisionListPage />,
    Header,
    Nav,
  },
  ruleCreate: {
    path: '/rule/create',
    getURL: (): string => routes.ruleCreate.path,
    getName: (): string => 'Create rule',
    element: <RuleCreatePage />,
    Header,
  },
  ruleUpdate: {
    path: '/rule/:id',
    getURL: (): string => routes.ruleUpdate.path,
    getName: (): string => 'Create Rule',
    element: <RuleUpdatePage />,
    Header,
  },
  ruleList: {
    path: '/rules',
    getURL: (): string => routes.ruleList.path,
    getName: (): string => 'Rules',
    element: <RuleListPage />,
    Header,
  },
  domainList: {
    path: '/domains',
    getName: (): string => 'Domains',
    getURL: (): string => routes.domainList.path,
    element: <DomainListPage />,
    Header,
  },
  tree: {
    path: '/tree',
    getName: (): string => 'Tree',
    getURL: (): string => routes.tree.path,
    element: <TreePage />,
    Header,
  },
  decisionCreate: {
    path: '/decision/create',
    getURL: (): string => routes.decisionCreate.path,
    getName: (): string => 'Create Decision',
    element: <DecisionCreatePage />,
  },
  decisionId: {
    path: '/decision/:id',
    getURL: (): string => routes.decisionId.path,
    getName: (): string => 'Decision',
    element: <DecisionIdPage />,
  },
  // Other
  settings: {
    path: '/settings',
    getURL: (): string => routes.settings.path,
    getName: (): string => 'Settings',
    element: <SettingsPage />,
    Header,
    Nav,
  },
  login: {
    path: '/login',
    getURL: (): string => routes.login.path,
    getName: (): string => 'Login',
    element: <LoginPage />,
    // Header,
    // Nav,
  },

  storybook: {
    path: '/storybook/*',
    getName: (): string => 'Storybook',
    Header,
    Nav: StoryNav,
    element: <Story />,
    getURL: (): string => '/storybook',
  },

  notFound: {
    Header,
    Nav,
    path: '/*',
    element: <NotFoundPage />,
    getName: (): string => 'notFound',
    getURL: (): string => '',
  },
} satisfies Record<string, Route>
