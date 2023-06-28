import { FC, lazy } from 'react'
import { RouteProps } from 'react-router-dom'

import DecisionListPage from '~/pages/decision'
import DecisionIdPage from '~/pages/decision/id'
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
    path: '/project-with-tree*',
    element: <NotFoundPage />,
  },

  /* ABSTRACT */

  abstractButton: {
    Header,
    Nav,
    getName: () => 'AbstractButton',
    path: '/project-with-tree/storybook/abstract/button',
    element: <AbstractButtonPage />,
  },

  /* ENTITIES */

  pointNode: {
    Header,
    Nav,
    getName: () => 'PointNode',
    path: '/project-with-tree/storybook/entities/point/node',
    element: <PointNodePage />,
  },

  /* UI */

  callout: {
    Header,
    Nav,
    getName: () => 'Callout',
    path: '/project-with-tree/ui/callout',
    element: <CalloutPage />,
  },
  dropdown: {
    Header,
    Nav,
    getName: () => 'Dropdown',
    path: '/project-with-tree/ui/dropdown',
    element: <DropdownPage />,
  },
  list: {
    Header,
    Nav,
    getName: () => 'List',
    path: '/project-with-tree/ui/list',
    element: <ListPage />,
  },
  popover: {
    Header,
    Nav,
    getName: () => 'Popover',
    path: '/project-with-tree/ui/popover',
    element: <PopoverPage />,
  },
  speechBubble: {
    Header,
    Nav,
    getName: () => 'speechBubble',
    path: '/project-with-tree/ui/speech-bubble',
    element: <Balloon />,
  },
  textInput: {
    Header,
    Nav,
    getName: () => 'TextInput',
    path: '/project-with-tree/ui/text-input',
    element: <TextInputPage />,
  },
  uiNode: {
    Header,
    Nav,
    getName: () => 'Node',
    path: '/project-with-tree/ui/node',
    element: <UINodePage />,
  },
  editable: {
    Header,
    Nav,
    getName: () => 'Editable',
    path: '/project-with-tree/ui/editable',
    element: <UIEditablePage />,
  },
} as const

// eslint-disable-next-line import/no-unused-modules
export default routes as Record<string, Route>

export const routeList: Route[] = Object.values(routes)
