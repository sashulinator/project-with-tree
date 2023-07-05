import { Link, useNavigate } from 'react-router-dom'

import getRootElement from '~/lib/dom/get-root-element'
import { routes } from '~/shared/routes'
import { setCSSVar } from '~/utils/dom'

import Button from '../button'

export default function Header(): JSX.Element {
  const navigate = useNavigate()
  setCSSVar('header-height', 42, getRootElement())

  return (
    <header className='flex items-center justify-between mr-2rem ml-2rem'>
      <Link to={routes.main.path}>Logo</Link>
      <div>
        <Link to={routes.settings.path}>Settings</Link>
      </div>
      <Button onClick={(): void => navigate(routes.login.path)}>Logout</Button>
    </header>
  )
}
