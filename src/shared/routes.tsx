import { FC, lazy } from 'react'
import { RouteProps } from 'react-router-dom'

import DecisionPage from '~/pages/decision'
import LoginPage from '~/pages/login'
import MainPage from '~/pages/main'
import NotFoundPage from '~/pages/not-found'
import SettingsPage from '~/pages/settings'
import Balloon from '~/pages/storybook/ui/balloon'
import CalloutPage from '~/pages/storybook/ui/callout'
import DropdownPage from '~/pages/storybook/ui/dropdown'
import ListPage from '~/pages/storybook/ui/list'
import UINodePage from '~/pages/storybook/ui/node'
import PopoverPage from '~/pages/storybook/ui/popover'
import TextInputPage from '~/pages/storybook/ui/text-input'
import Header from '~/ui/header'
import Nav from '~/ui/nav'

const AbstractButtonPage = lazy(() => import('~/pages/storybook/abstract/button'))
const PointNodePage = lazy(() => import('~/pages/storybook/entities/point/node'))
const UIEditablePage = lazy(() => import('~/pages/storybook/ui/editable'))

type Route = Omit<RouteProps, 'path'> & {
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
    path: '/main',
    element: <MainPage />,
  },
  createDecision: {
    getName: () => 'Create Decision',
    path: '/decision',
    element: <DecisionPage />,
  },
  decision: {
    getName: () => 'Decision',
    path: '/decision/:id',
    element: <DecisionPage />,
  },
  // Other
  settings: {
    Header,
    Nav,
    getName: () => 'Settings',
    path: '/settings',
    element: <SettingsPage />,
  },
  login: {
    // Header,
    // Nav,
    getName: () => 'Login',
    path: '/login',
    element: <LoginPage />,
  },
  notFound: {
    Header,
    Nav,
    getName: () => 'notFound',
    path: '*',
    element: <NotFoundPage />,
  },

  /* ABSTRACT */

  abstractButton: {
    Header,
    Nav,
    getName: () => 'AbstractButton',
    path: '/storybook/abstract/button',
    element: <AbstractButtonPage />,
  },

  /* ENTITIES */

  pointNode: {
    Header,
    Nav,
    getName: () => 'PointNode',
    path: '/storybook/entities/point/node',
    element: <PointNodePage />,
  },

  /* UI */

  callout: {
    Header,
    Nav,
    getName: () => 'Callout',
    path: '/ui/callout',
    element: <CalloutPage />,
  },
  dropdown: {
    Header,
    Nav,
    getName: () => 'Dropdown',
    path: '/ui/dropdown',
    element: <DropdownPage />,
  },
  list: {
    Header,
    Nav,
    getName: () => 'List',
    path: '/ui/list',
    element: <ListPage />,
  },
  popover: {
    Header,
    Nav,
    getName: () => 'Popover',
    path: '/ui/popover',
    element: <PopoverPage />,
  },
  speechBubble: {
    Header,
    Nav,
    getName: () => 'speechBubble',
    path: '/ui/speech-bubble',
    element: <Balloon />,
  },
  textInput: {
    Header,
    Nav,
    getName: () => 'TextInput',
    path: '/ui/text-input',
    element: <TextInputPage />,
  },
  uiNode: {
    Header,
    Nav,
    getName: () => 'Node',
    path: '/ui/node',
    element: <UINodePage />,
  },
  editable: {
    Header,
    Nav,
    getName: () => 'Editable',
    path: '/ui/editable',
    element: <UIEditablePage />,
  },
} as const

// eslint-disable-next-line import/no-unused-modules
export default routes as Record<string, Route>

export const routeList: Route[] = Object.values(routes)
