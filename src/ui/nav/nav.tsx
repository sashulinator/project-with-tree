import './nav.scss'

import getRootElement from '~/lib/dom/get-root-element'
import { routes } from '~/shared/routes'
import Link from '~/ui/link'
import { c, isDev } from '~/utils/core'
import { setCSSVar } from '~/utils/dom'

Nav.displayName = 'ui-Nav'

export default function Nav(): JSX.Element {
  setCSSVar('nav-width', 200, getRootElement())

  return (
    <nav className={c(Nav.displayName)}>
      <ul>
        {isDev() && (
          <>
            <ol>
              <Link to={routes.storybook.getURL()}>Storybook</Link>
            </ol>
          </>
        )}
      </ul>
    </nav>
  )
}
