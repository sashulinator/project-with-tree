import './user-item.scss'

import { UnstyledButton } from '~/abstract/button'
import { c } from '~/utils/core'

import { User } from '../../..'

UserItem.displayName = 'ui-LoginForm-w-UserItem'

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
  user: User
}

export default function UserItem(props: Props): JSX.Element {
  const { className, user, ...buttonProps } = props
  return (
    <div className={c(className, UserItem.displayName)}>
      <UnstyledButton className='user' {...buttonProps}>
        <div className='avatar'>{user.name[0]}</div>
        <span className='name'>{user.name}</span>
      </UnstyledButton>
    </div>
  )
}
