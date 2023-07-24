import getRootElement from '~/lib/dom/get-root-element'

import ThemeDropdown from '~/ui/theme-dropdown'
import { setCSSVar } from '~/utils/dom'

import { routes } from '../../../shared/routes'

import Flex from '~/abstract/flex'
import { List } from '../widgets/list/ui/list'

export default function Nav(): JSX.Element {
  setCSSVar('nav-width', 200, getRootElement())

  return (
    <nav>
      <Flex gap='xxxl' dir='column' padding='var(--xxxl)'>
        <ThemeDropdown />
        <ul style={{ width: '100%' }}>
          <Flex gap='m' dir='column'>
            <List routes={routes} />
          </Flex>
        </ul>
      </Flex>
    </nav>
  )
}
