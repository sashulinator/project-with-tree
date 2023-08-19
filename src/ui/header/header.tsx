import './header.scss'

import { useNavigate } from 'react-router-dom'

import getRootElement from '~/lib/dom/get-root-element'
import { routes } from '~/shared/routes'
import { GhostButton } from '~/ui/button'
import Link from '~/ui/link'
import { c } from '~/utils/core'
import { setCSSVar } from '~/utils/dom'

import { Logo } from '../icon'
import { Logout } from '../icon/variants/logout'
import { User } from '../icon/variants/user'

Header.displayName = 'ui-Header'

export default function Header(): JSX.Element {
  const navigate = useNavigate()
  setCSSVar('header-height', 42, getRootElement())

  return (
    <header className={c(Header.displayName)}>
      <Link to={routes.main.path}>
        <Logo height={20} />
      </Link>
      <div style={{ display: 'flex' }}>
        <GhostButton onClick={(): void => navigate(routes.settings.path)} square={true}>
          <User />
        </GhostButton>
        <GhostButton onClick={(): void => navigate(routes.login.path)} square={true}>
          <Logout />
        </GhostButton>
      </div>
    </header>
  )
}
