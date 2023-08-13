import { aCanvasWItem } from './pages/canvas/a-w-item'
import { uiCanvasNode } from './pages/canvas/ui-w-node'
import { decisionCanvasNodeVSift } from './pages/canvas/ui-w-node-v-filter'
import { aCanvasWNodeWJoint } from './pages/canvas/ui-w-node-w-joint'
import { uiCheckbox } from './pages/checkbox/ui-checkbox'
import { uiLabeled } from './pages/labeled/ui-labeled'

export type RouteConfig = {
  name: string | undefined
  element: () => JSX.Element
  description: string
  features: readonly string[]
  type: readonly ('abstract' | 'widget' | 'ui')[]
  extends?: {
    name: string | undefined
    list: string[]
  }
}

export type Route = {
  path: string
  element: React.ReactNode
  getName: () => string
  getURL: () => string
  config: RouteConfig
  children?: Record<string, Route>
}

function configToRoute(config: RouteConfig): Route {
  const path = config.name || ''

  return {
    path,
    element: <config.element />,
    getName: (): string => config.name || '',
    getURL: (): string => `project-with-tree/storybook-new/${path}`,
    config,
  }
}

export const routes = {
  canvas: {
    getName: (): string => 'Canvas',
    path: 'project-with-tree/storybook-new/canvas',
    element: <></>,
    getURL: (): string => `project-with-tree/storybook-new/canvas`,
    config: {
      name: 'Canvas',
      description: 'Состоит из виджетов',
      features: [],
      extends: undefined,
    },
    children: {
      aCanvasWItem: configToRoute(aCanvasWItem),
      aCanvasWNodeWJoint: configToRoute(aCanvasWNodeWJoint),
      uiNode: configToRoute(uiCanvasNode),
      decisionCanvasNodeVSift: configToRoute(decisionCanvasNodeVSift),
    },
  },
  checkbox: {
    getName: (): string => 'Checkbox',
    path: 'project-with-tree/storybook-new/checkbox',
    element: <></>,
    getURL: (): string => `project-with-tree/storybook-new/checkbox`,
    config: {
      name: 'Checkbox',
      description: 'checkbox',
      features: [],
      extends: undefined,
    },
    children: {
      uiCheckbox: configToRoute(uiCheckbox),
    },
  },
  labeled: {
    getName: (): string => 'Labeled',
    path: 'project-with-tree/storybook-new/labeled',
    element: <></>,
    getURL: (): string => `project-with-tree/storybook-new/labeled`,
    config: {
      name: 'Labeled',
      description: 'Labeled',
      features: [],
      extends: undefined,
    },
    children: {
      uiLabeled: configToRoute(uiLabeled),
    },
  },
}
