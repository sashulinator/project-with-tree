import getRootElement from '~/lib/dom/get-root-element'
import Link from '~/ui/link'
import ThemeDropdown from '~/ui/theme-dropdown'
import { setCSSVar } from '~/utils/dom'

import { routes } from '../../../shared/routes'
import { ChevronAccordion } from '~/ui/accordion'
import Flex from '~/abstract/flex'

export default function Nav(): JSX.Element {
  setCSSVar('nav-width', 200, getRootElement())

  return (
    <nav>
      <Flex gap='xxxl' dir='column' padding='var(--xxxl)'>
        <ThemeDropdown />
        <ul>
          <Flex gap='m' dir='column'>
            <li>
              <Link to={routes.accordion.getURL()}>Accordion</Link>
            </li>
            <ChevronAccordion height={null} header={<Link to={routes.button.getURL()}>Button</Link>}>
              <ul>
                <Flex gap='m' dir='column' padding='0.5rem 0 0.5rem 1rem'>
                  <li>
                    <Link to={routes.button.getURL()}>Button</Link>
                  </li>
                </Flex>
              </ul>
            </ChevronAccordion>
            <li>
              <Link to={routes.collapse.getURL()}>Collapse</Link>
            </li>
            <li>
              <ChevronAccordion height={null} header={<Link to={routes.canvas.getURL()}>Canvas</Link>}>
                <ul>
                  <Flex gap='m' dir='column' padding='0.5rem 0 0.5rem 1rem'>
                    <li>
                      <Link to={routes.collapse.getURL()}>Item</Link>
                    </li>
                    <li>
                      <Link to={routes.collapse.getURL()}>Node</Link>
                    </li>
                  </Flex>
                </ul>
              </ChevronAccordion>
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
          </Flex>
        </ul>
      </Flex>
    </nav>
  )
}
