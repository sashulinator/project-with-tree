import { routes as sharedRoutes } from '~/shared/routes'

import AccordionPage from '../pages/accordion/accordion'
import ButtonPage from '../pages/button'
import { AButtonWUnstyledPage } from '../pages/button/a-w-unstyled'
import { ButtoUIPage } from '../pages/button/ui'
import UIButtonVGhostPage from '../pages/button/ui-v-ghost'
import UIButtonVPrimaryPage from '../pages/button/ui-v-primary'
import CanvasPage from '../pages/canvas'
import ChipPage from '../pages/chip'
import CollapsePage from '../pages/collapse'
import DropdownPage from '../pages/dropdown'
import FieldInputPage from '../pages/field'
import InputPage from '../pages/input'
import ListPage from '../pages/list'
import MentionPage from '../pages/mentions/mentions'
import UINodePage from '../pages/node'
import OldListPage from '../pages/old-list'
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

  uiNode: {
    path: '/ui/node',
    element: <UINodePage />,
    getName: (): string => 'Node',
    getURL: function (): string {
      return `${sharedRoutes.storybook.getURL()}${this.path}`
    },
  },
} satisfies Record<string, Route>
