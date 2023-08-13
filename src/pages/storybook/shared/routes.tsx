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
import { ButtoUIPage } from '../pages/button/ui'
import UIButtonVGhostPage from '../pages/button/ui-v-ghost'
import { AButtonWUnstyledPage } from '../pages/button/a-w-unstyled'
import ChipPage from '../pages/chip'
import UIButtonVPrimaryPage from '../pages/button/ui-v-primary'
import PaginationPage from '../pages/pagination/pagination'

export type Route = {
  path: string
  element: React.ReactNode
  getName: () => string
  getURL: () => string
  children?: Record<string, Route>
  type?: ('abstract' | 'private' | 'widget' | 'variant' | 'ui')[]
}

export const routes = {
  accordion: {
    path: '/accordion',
    element: <AccordionPage />,
    getName: (): string => 'Accordion',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },

  chip: {
    path: '/chip',
    element: <ChipPage />,
    getName: (): string => 'Chip',
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
    children: {
      abstract: {
        path: '/button/abstract',
        element: <ButtoUIPage />,
        getName: (): string => 'a-Button',
        getURL: function (): string {
          return `${sharedRoutes.storybook.getURL()}${this.path}`
        },
        type: ['abstract'],
      },
      aUstyled: {
        path: '/button/a-w-unstyled',
        element: <AButtonWUnstyledPage />,
        getName: (): string => 'a-w-Unstyled',
        getURL: function (): string {
          return `${sharedRoutes.storybook.getURL()}${this.path}`
        },
        type: ['abstract', 'widget'],
      },
      ui: {
        path: '/button/ui',
        element: <ButtoUIPage />,
        getName: (): string => 'ui-Button',
        getURL: function (): string {
          return `${sharedRoutes.storybook.getURL()}${this.path}`
        },
        type: ['ui'],
      },
      uiGhost: {
        path: '/button/ui-v-ghost',
        element: <UIButtonVGhostPage />,
        getName: (): string => 'ui-v-Ghost',
        getURL: function (): string {
          return `${sharedRoutes.storybook.getURL()}${this.path}`
        },
        type: ['ui', 'variant'],
      },
      uiPrimary: {
        path: '/button/ui-v-primary',
        element: <UIButtonVPrimaryPage />,
        getName: (): string => 'ui-v-Primary',
        getURL: function (): string {
          return `${sharedRoutes.storybook.getURL()}${this.path}`
        },
        type: ['ui', 'variant'],
      },
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
  pagination: {
    path: '/pagination',
    element: <PaginationPage />,
    getName: (): string => 'Pagination',
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
} satisfies Record<string, Route>
