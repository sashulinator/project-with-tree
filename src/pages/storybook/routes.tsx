import { routes as sharedRoutes } from '~/shared/routes'
import Header from '~/ui/header'
import Nav from '~/ui/nav'

import PointNodePage from './entities/point/node'
import Balloon from './ui/balloon'
import AbstractButtonPage from './ui/button'
import CalloutPage from './ui/callout'
import DropdownPage from './ui/dropdown'
import UIEditablePage from './ui/editable/index'
import ListPage from './ui/list'
import UINodePage from './ui/node'
import PopoverPage from './ui/popover'
import TextInputPage from './ui/old-text-input'

export const routes = {
  callout: {
    path: '/ui/callout',
    element: <CalloutPage />,
    getName: (): string => 'Callout',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },
  dropdown: {
    path: '/ui/dropdown',
    element: <DropdownPage />,
    getName: (): string => 'Dropdown',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },
  list: {
    path: '/ui/list',
    element: <ListPage />,
    getName: (): string => 'List',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },
  popover: {
    path: '/ui/popover',
    element: <PopoverPage />,
    getName: (): string => 'Popover',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },
  speechBubble: {
    path: '/ui/speech-bubble',
    element: <Balloon />,
    getName: (): string => 'speechBubble',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },
  textInput: {
    path: '/ui/text-input',
    element: <TextInputPage />,
    getName: (): string => 'TextInput',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },

  uiNode: {
    path: '/ui/node',
    element: <UINodePage />,
    getName: (): string => 'Node',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },
  editable: {
    path: '/ui/editable',
    element: <UIEditablePage />,
    getName: (): string => 'Editable',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },

  abstractButton: {
    path: '/abstract/button',
    element: <AbstractButtonPage />,
    getName: (): string => 'AbstractButton',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },

  /* ENTITIES */

  pointNode: {
    Header,
    Nav,
    path: '/entities/point/node',
    element: <PointNodePage />,
    getName: (): string => 'PointNode',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },
}
