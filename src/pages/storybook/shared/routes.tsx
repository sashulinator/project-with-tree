import { routes as sharedRoutes } from '~/shared/routes'

import Balloon from '../pages/balloon'
import ButtonPage from '../pages/button'
import CalloutPage from '../pages/callout'
import DropdownPage from '../pages/dropdown'

import OldListPage from '../pages/old-list'
import UINodePage from '../pages/node'
import PopoverPage from '../pages/popover'

import FieldInputPage from '../pages/field'
import InputPage from '../pages/input'
import ListPage from '../pages/list'
import CanvasPage from '../pages/canvas'
import CollapsePage from '../pages/collapse'
import MentionPage from '../pages/mentions/mentions'
import AccordionPage from '../pages/accordion/accordion'

export const routes = {
  accordion: {
    path: '/accordion',
    element: <AccordionPage />,
    getName: (): string => 'Accordion',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },

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
}
