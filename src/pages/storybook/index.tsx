import React from 'react'

import { emitter } from '~/shared/emitter'
import { routes as sharedRoutes } from '~/shared/routes'
import Header from '~/ui/header'
import Link from '~/ui/link'
import Nav from '~/ui/nav'

import AbstractButtonPage from './abstract/button/'
import PointNodePage from './entities/point/node'
import Balloon from './ui/balloon'
import CalloutPage from './ui/callout'
import DropdownPage from './ui/dropdown'
import UIEditablePage from './ui/editable/index'
import ListPage from './ui/list'
import UINodePage from './ui/node'
import PopoverPage from './ui/popover'
import TextInputPage from './ui/text-input'

const routes = {
  callout: {
    Header,
    Nav,
    getName: (): string => 'Callout',
    path: '/project-with-tree/storybook/ui/callout',
    element: <CalloutPage />,
  },
  dropdown: {
    Header,
    Nav,
    getName: (): string => 'Dropdown',
    path: '/project-with-tree/storybook/ui/dropdown',
    element: <DropdownPage />,
  },
  list: {
    Header,
    Nav,
    getName: (): string => 'List',
    path: '/project-with-tree/storybook/ui/list',
    element: <ListPage />,
  },
  popover: {
    Header,
    Nav,
    getName: (): string => 'Popover',
    path: '/project-with-tree/storybook/ui/popover',
    element: <PopoverPage />,
  },
  speechBubble: {
    Header,
    Nav,
    getName: (): string => 'speechBubble',
    path: '/project-with-tree/storybook/ui/speech-bubble',
    element: <Balloon />,
  },
  textInput: {
    Header,
    Nav,
    getName: (): string => 'TextInput',
    path: '/project-with-tree/storybook/ui/text-input',
    element: <TextInputPage />,
  },

  uiNode: {
    Header,
    Nav,
    getName: (): string => 'Node',
    path: '/project-with-tree/ui/node',
    element: <UINodePage />,
  },
  editable: {
    Header,
    Nav,
    getName: (): string => 'Editable',
    path: '/project-with-tree/ui/editable',
    element: <UIEditablePage />,
  },

  abstractButton: {
    Header,
    Nav,
    getName: (): string => 'AbstractButton',
    path: '/project-with-tree/storybook/abstract/button',
    element: <AbstractButtonPage />,
  },

  /* ENTITIES */

  pointNode: {
    Header,
    Nav,
    getName: (): string => 'PointNode',
    path: '/project-with-tree/storybook/entities/point/node',
    element: <PointNodePage />,
  },
}

setTimeout(() => {
  emitter.emit('addRoutes', routes)
}, 100)

export default function StorybookPage(): JSX.Element {
  return (
    <main className='StorybookPage'>
      <ul>
        abstract
        <ol>
          <Link to={routes.abstractButton.path}>Button</Link>
        </ol>
        ui
        <ol>
          <Link to={routes.callout.path}>Callout</Link>
        </ol>
        <ol>
          <Link to={routes.dropdown.path}>Dropdown</Link>
        </ol>
        <ol>
          <Link to={routes.editable.path}>Editable</Link>
        </ol>
        <ol>
          <Link to={routes.list.path}>List</Link>
        </ol>
        <ol>
          <Link to={routes.textInput.path}>TextInput</Link>
        </ol>
        <ol>
          <Link to={routes.popover.path}>Popover</Link>
        </ol>
        <ol>
          <Link to={routes.speechBubble.path}>Balloon</Link>
        </ol>
        <ol>
          <Link to={routes.uiNode.path}>Node</Link>
        </ol>
        entities
        <ol>
          <Link to={routes.pointNode.path}>PointNode</Link>
        </ol>
      </ul>
    </main>
  )
}
