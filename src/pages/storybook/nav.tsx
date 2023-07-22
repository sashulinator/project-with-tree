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
        <li>
          <Link to={routes.accordion.getURL()}>Accordion</Link>
        </li>
        <li>
          <Link to={routes.button.getURL()}>Button</Link>
        </li>
        <li>
          <Link to={routes.canvas.getURL()}>Canvas</Link>
        </li>
        <li>
          <Link to={routes.collapse.getURL()}>Collapse</Link>
        </li>
        <li>
          <Link to={routes.field.getURL()}>Field</Link>
        </li>
        <li>
          <Link to={routes.input.getURL()}>Input</Link>
        </li>
        <li>
          <Link to={routes.mentions.getURL()}>Mentions</Link>
        </li>
        <li>
          <Link to={routes.list.getURL()}>List</Link>
        </li>
        <br />
        <li>
          <Link to={routes.callout.getURL()}>Callout</Link>
        </li>
        <li>
          <Link to={routes.dropdown.getURL()}>Dropdown</Link>
        </li>
        <li>
          <Link to={routes.oldList.getURL()}>List</Link>
        </li>
        <li>
          <Link to={routes.popover.getURL()}>Popover</Link>
        </li>
        <li>
          <Link to={routes.speechBubble.getURL()}>Balloon</Link>
        </li>
        <li>
          <Link to={routes.uiNode.getURL()}>Node</Link>
        </li>
      </ul>
    </nav>
  )
}
