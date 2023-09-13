import { Fragment } from 'react'
import { Scrollbars } from 'react-custom-scrollbars'

import Flex from '~/abstract/flex'
import getRootElement from '~/lib/dom/get-root-element'
import { configToPath } from '~/storybook/lib'
import { routes } from '~/storybook/routes'
import { Config } from '~/storybook/types'
import ThemeDropdown from '~/ui/theme-dropdown'
import { Any } from '~/utils/core'
import { setCSSVar } from '~/utils/dom'

import ConfigLink from '../../config-link/ui/config-link'

export default function Nav(): JSX.Element {
  setCSSVar('nav-width', 200, getRootElement())

  return (
    <nav
      style={{
        borderRight: '1px solid var(--bgSecondary)',
        height: 'calc(100vh - var(--header-height) * 1px)',
      }}
    >
      <Scrollbars autoHide autoHideTimeout={1000} autoHideDuration={500}>
        <Flex gap='xxxl' dir='column' padding='var(--xxxl)'>
          <ThemeDropdown />
          <ul style={{ width: '100%' }}>
            <Flex gap='m' dir='column'>
              <ul>
                {routes.flatMap(([name, ...configs]) => {
                  return (
                    <Fragment key={name}>
                      <li style={{ marginTop: 'var(--l)' }}>{name}</li>
                      <ul>
                        {configs.map((c: unknown) => {
                          const config = c as Config<Any>
                          const path = configToPath(config)
                          return (
                            <li key={path} style={{ marginTop: 'var(--m)' }}>
                              <ConfigLink config={config} />
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
      </Scrollbars>
    </nav>
  )
}
