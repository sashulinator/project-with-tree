import { Fragment } from 'react'

import Flex from '~/abstract/flex'
import getRootElement from '~/lib/dom/get-root-element'
import { routes } from '~/storybook/routes'
import Link from '~/ui/link'
import ThemeDropdown from '~/ui/theme-dropdown'
import { setCSSVar } from '~/utils/dom'

export default function Nav(): JSX.Element {
  setCSSVar('nav-width', 200, getRootElement())

  return (
    <nav style={{ borderRight: '1px solid var(--bgSecondary)' }}>
      <Flex gap='xxxl' dir='column' padding='var(--xxxl)'>
        <ThemeDropdown />
        <ul style={{ width: '100%' }}>
          <Flex gap='m' dir='column'>
            <ul>
              {routes.flatMap(([name, ...configs]) => {
                return (
                  <Fragment key={name}>
                    <li>{name}</li>
                    <ul>
                      {configs.map((config) => {
                        return (
                          <li key={`project-with-tree/story${config.getPath()}`}>
                            <Link to={`project-with-tree/story${config.getPath()}`}>{config.getName()}</Link>
                          </li>
                        )
                      })}
                    </ul>
                  </Fragment>
                )
              })}
            </ul>
          </Flex>
        </ul>
      </Flex>
    </nav>
  )
}
