import getRootElement from '~/lib/dom/get-root-element'
import Link from '~/ui/link'
import ThemeDropdown from '~/ui/theme-dropdown'
import { setCSSVar } from '~/utils/dom'

import { routes } from './routes'

export default function Nav(): JSX.Element {
  setCSSVar('nav-width', 200, getRootElement())

  return (
    <nav className='pt-5rem pl-2rem'>
      <ThemeDropdown />
      <ul>
        ui
        <ol>
          <Link to={routes.button.getURL()}>Button</Link>
        </ol>
        <ol>
          <Link to={routes.field.getURL()}>Field</Link>
        </ol>
        <ol>
          <Link to={routes.input.getURL()}>Input</Link>
        </ol>
        <ol>
          <Link to={routes.callout.getURL()}>Callout</Link>
        </ol>
        <ol>
          <Link to={routes.dropdown.getURL()}>Dropdown</Link>
        </ol>
        <ol>
          <Link to={routes.oldList.getURL()}>List</Link>
        </ol>
        <ol>
          <Link to={routes.popover.getURL()}>Popover</Link>
        </ol>
        <ol>
          <Link to={routes.speechBubble.getURL()}>Balloon</Link>
        </ol>
        <ol>
          <Link to={routes.uiNode.getURL()}>Node</Link>
        </ol>
        <b>entities</b>
        <ol>
          <Link to={routes.pointNode.getURL()}>PointNode</Link>
        </ol>
      </ul>
    </nav>
  )
}
