import { FC } from 'react'
import { RouteProps } from 'react-router-dom'

import Layout from '~/pages/layout'
import LoginPage from '~/pages/login'
import MainPage from '~/pages/main'
import NotFoundPage from '~/pages/not-found'
import SettingsPage from '~/pages/settings'
import Balloon from '~/pages/ui/balloon'
import CalloutPage from '~/pages/ui/callout'
import DropdownPage from '~/pages/ui/dropdown'
import ListPage from '~/pages/ui/list'
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
  createLayout: {
    getName: () => 'CreateLayout',
    path: '/layout',
    element: <Layout />,
  },
  layout: {
    getName: () => 'Layout',
    path: '/layout/:id',
    element: <Layout />,
  },
  textInput: {
    Header,
    Nav,
    getName: () => 'TextInput',
    path: '/ui/text-input',
    element: <TextInputPage />,
  },
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
} as const

// eslint-disable-next-line import/no-unused-modules
export default routes as Record<string, Route>

export const routeList: Route[] = Object.values(routes)
