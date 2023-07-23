import getRootElement from '~/lib/dom/get-root-element'
import Link from '~/ui/link'
import ThemeDropdown from '~/ui/theme-dropdown'
import { setCSSVar } from '~/utils/dom'

import { Route, routes } from '../../../shared/routes'
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
            {Object.entries(routes).map(([key, route]: [string, Route]) => {
              if (route.children) {
                return (
                  <ChevronAccordion
                    defaultExpanded={true}
                    height={'s'}
                    header={<Link to={route.getURL()}>{route.getName()}</Link>}
                  >
                    <Flex padding='0.5rem 0 0.5rem 1rem ' dir='column' gap='m'>
                      {Object.entries(route.children).map(([key, route]) => {
                        return (
                          <li key={key}>
                            <Link to={route.getURL()}>{route.getName()}</Link>
                          </li>
                        )
                      })}
                    </Flex>
                  </ChevronAccordion>
                )
              } else {
                return (
                  <li key={key}>
                    <Link to={route.getURL()}>{route.getName()}</Link>
                  </li>
                )
              }
            })}
          </Flex>
        </ul>
      </Flex>
    </nav>
  )
}
