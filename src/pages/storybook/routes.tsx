import { routes as sharedRoutes } from '~/shared/routes'
import Header from '~/ui/header'
import Nav from '~/ui/nav'

import PointNodePage from './entities/point/node'
import Balloon from './ui/balloon'
import ButtonPage from './ui/button'
import CalloutPage from './ui/callout'
import DropdownPage from './ui/dropdown'

import OldListPage from './ui/old-list'
import UINodePage from './ui/node'
import PopoverPage from './ui/popover'

import FieldInputPage from './ui/field'
import InputPage from './ui/input'
import ListPage from './ui/list'
import CanvasPage from './ui/canvas'
import CollapsePage from './ui/collapse'
import MentionPage from './ui/mentions/mentions'

export const routes = {
  button: {
    path: '/button',
    element: <ButtonPage />,
    getName: (): string => 'Button',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },

  collapse: {
    path: '/ui/collapse',
    element: <CollapsePage />,
    getName: (): string => 'Collapse',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },

  field: {
    path: '/field',
    element: <FieldInputPage />,
    getName: (): string => 'Field',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },

  input: {
    path: '/input',
    element: <InputPage />,
    getName: (): string => 'Input',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },

  canvas: {
    path: '/canvas',
    element: <CanvasPage />,
    getName: (): string => 'canvas',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },

  mentions: {
    path: '/mentions',
    element: <MentionPage />,
    getName: (): string => 'Mentions',
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
  oldList: {
    path: '/ui/old-list',
    element: <OldListPage />,
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
  uiNode: {
    path: '/ui/node',
    element: <UINodePage />,
    getName: (): string => 'Node',
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
