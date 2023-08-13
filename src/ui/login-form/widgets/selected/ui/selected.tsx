import './selected.scss'

import { c } from '~/utils/core'

import { User, UserItem } from '../../..'

Selected.displayName = 'ui-LoginForm-w-Selected'

export interface Props extends React.HTMLAttributes<HTMLButtonElement> {
  className?: string
  user: User
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Selected(props: Props): JSX.Element {
  const { className, ...userItemProps } = props

  return <UserItem {...userItemProps} className={c(className, Selected.displayName)} />
}
