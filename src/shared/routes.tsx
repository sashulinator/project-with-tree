import { FC } from 'react'
import { RouteProps } from 'react-router-dom'

import DecisionPage from '~/pages/decision'
import LoginPage from '~/pages/login'
import MainPage from '~/pages/main'
import NotFoundPage from '~/pages/not-found'
import SettingsPage from '~/pages/settings'
import Balloon from '~/pages/ui/balloon'
import CalloutPage from '~/pages/ui/callout'
import DropdownPage from '~/pages/ui/dropdown'
import ListPage from '~/pages/ui/list'
import UINodePage from '~/pages/ui/node'
import PopoverPage from '~/pages/ui/popover'
import TextInputPage from '~/pages/ui/text-input'
import Header from '~/ui/header'
import Nav from '~/ui/nav'

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
} as const

// eslint-disable-next-line import/no-unused-modules
export default routes as Record<string, Route>

export const routeList: Route[] = Object.values(routes)
