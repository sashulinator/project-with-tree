import getRootElement from '~/lib/dom/get-root-element'
import { routes } from '~/shared/routes'
import Link from '~/ui/link'
import { setCSSVar } from '~/utils/dom'

export default function Nav(): JSX.Element {
  setCSSVar('nav-width', 200, getRootElement())

  return (
    <nav className='pt-5rem pl-2rem'>
      <ul>
        abstract
        <ol>
          <Link to={routes.decisionList.path}>Decisions</Link>
        </ol>
        {location.pathname.indexOf(routes.storybook.path.replace('/*', '')) !== -1 && (
          <ol>
            <Link to={routes.storybook.path}>Storybook</Link>
          </ol>
        )}
      </ul>
    </nav>
  )
}
