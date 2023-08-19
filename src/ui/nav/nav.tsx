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
        <ol>
          <Link to={routes.decisionList.getURL()}>Decisions</Link>
        </ol>
        <ol>
          <Link to={routes.ruleCreate.getURL()}>Rules</Link>
        </ol>
        {isDev() && (
          <>
            <ol>
              <Link to={routes.story.getURL()}>Storybook</Link>
            </ol>
            <ol>
              <Link to={routes.storybook.getURL()}>Depricated Storybook</Link>
            </ol>
          </>
        )}
      </ul>
    </nav>
  )
}
