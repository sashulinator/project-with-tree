import { useEffect } from 'react'

// import Flex from '~/abstract/flex/ui/flex'
// import { GhostButton } from '~/ui/button'
import { c } from '~/utils/core'

// import { preventDefault } from '~/utils/dom-event'
// import { fns } from '~/utils/function'

// import { getUserList } from '../lib/get-users'

LoginForm.displayName = 'LoginUsers'

export interface Props {
  className?: string
  localStorageName: string
  children: React.ReactNode
  value: string | undefined
  onChange: (e: { target: { value: string | undefined } }) => void
}

export default function LoginForm(props: Props): JSX.Element {
  // const userList = getUserList(props.localStorageName)

  // const [selected, setSelected] = useState<string | undefined>(userList[0]?.name)

  // const [mode, setMode] = useState<'input' | 'selected' | 'list'>(userList.length === 0 ? 'input' : 'selected')

  // const isInputMode = mode === 'input'
  // const isSelectedMode = mode === 'selected'
  // const isLisLMode = mode === 'list'

  useEffect(() => {
    // if (props.value !== selected && mode !== 'input') {
    //   props.onChange({ target: { value: selected } })
    // }
  }, [props.value])

  return <div className={c(props.className, LoginForm.displayName)}></div>
}
