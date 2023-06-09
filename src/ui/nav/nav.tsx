import getRootElement from '~/lib/dom/get-root-element'
import { routes } from '~/shared/routes'
import Link from '~/ui/link'
import { isDev } from '~/utils/core'
import { setCSSVar } from '~/utils/dom'

export default function Nav(): JSX.Element {
  setCSSVar('nav-width', 200, getRootElement())

  return (
    <nav className='pt-5rem pl-2rem '>
      <ul>
        <ol>
          <Link to={routes.decisionList.getURL()}>Decisions</Link>
        </ol>
        <ol>
          <Link to={routes.rules.getURL()}>Rules</Link>
        </ol>
        {isDev() && (
          <ol>
            <Link to={routes.storybook.path}>Storybook</Link>
          </ol>
        )}
      </ul>
    </nav>
  )
}
