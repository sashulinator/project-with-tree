import { Link } from 'react-router-dom'

import getRootElement from '~/lib/dom/get-root-element'
import { routes } from '~/shared/routes'
import { setCSSVar } from '~/utils/dom'

export default function Nav(): JSX.Element {
  setCSSVar('nav-width', 200, getRootElement())

  return (
    <nav className='pt-5rem pl-2rem'>
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
    </nav>
  )
}
