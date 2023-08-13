import './list.scss'

import { GhostButton } from '~/ui/button'
import { Close } from '~/ui/icon'
import { c } from '~/utils/core'

import { User, UserItem } from '../../../../..'

List.displayName = 'ui-LoginForm-w-UserItem-v-List'

export interface Props {
  className?: string
  userList: User[]
  isExpanded: boolean
  onSelect: (user: User) => void
  onRemove: (user: User) => void
}

export default function List(props: Props): JSX.Element {
  return (
    <ul className={c(props.className, List.displayName)}>
      {props.userList.map((user) => {
        return (
          <li key={user.name}>
            <UserItem user={user} onClick={(): void => props.onSelect(user)} />
            <GhostButton className='remove' round={true} onClick={(): void => props.onRemove(user)}>
              <Close />
            </GhostButton>
          </li>
        )
      })}
    </ul>
  )
}
