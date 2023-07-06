import { useNavigate } from 'react-router-dom'

import getRootElement from '~/lib/dom/get-root-element'
import { routes } from '~/shared/routes'
import Button from '~/ui/button'
import Link from '~/ui/link'
import { setCSSVar } from '~/utils/dom'

import { Logo } from '../icon'
import { Logout } from '../icon/widgets/logout'
import { User } from '../icon/widgets/user'

export default function Header(): JSX.Element {
  const navigate = useNavigate()
  setCSSVar('header-height', 42, getRootElement())

  return (
    <header className='flex items-center justify-between mr-2rem ml-2rem'>
      <Link to={routes.main.path}>
        <Logo height={20} />
      </Link>
      <div style={{ display: 'flex' }}>
        <Button onClick={(): void => navigate(routes.settings.path)} variant='ghost' square={true}>
          <User />
        </Button>
        <Button onClick={(): void => navigate(routes.login.path)} variant='ghost' square={true}>
          <Logout />
        </Button>
      </div>
    </header>
  )
}
