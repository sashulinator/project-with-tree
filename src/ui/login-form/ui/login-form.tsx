import './login-form.scss'

import { useState } from 'react'

import Collapse from '~/abstract/collapse'
import Flex from '~/abstract/flex/ui/flex'
import { GhostButton } from '~/ui/button'
import { Plus, User as UserIcon } from '~/ui/icon'
import { c } from '~/utils/core'
import { fns } from '~/utils/function'
import { useForceUpdate } from '~/utils/hooks'

import { Form, FormSubmitData, Selected, User, UserList, addUser, getUserList, removeUser, translations } from '..'

LoginForm.displayName = 'ui-LoginForm'

export interface Props {
  className?: string
  localStorageName: string
  translations: Partial<typeof translations>
  onSubmit: (data: FormSubmitData, onSuccess: (user: User) => void) => void
}

export default function LoginForm(props: Props): JSX.Element {
  const t = { ...translations, ...props.translations }
  const update = useForceUpdate()

  const userList = getUserList(props.localStorageName)
  const [selected, setSelected] = useState<User | undefined>(userList[0])

  const [mode, setMode] = useState<'input' | 'selected' | 'list'>(userList.length === 0 ? 'input' : 'selected')

  const isInputMode = mode === 'input'
  const isSelectedMode = mode === 'selected'
  const isLisLMode = mode === 'list'

  return (
    <div className={c(props.className, LoginForm.displayName)}>
      <Flex padding='4px'>
        {isLisLMode && (
          <GhostButton
            height='s'
            padding='s'
            onClick={fns(
              () => setMode('input'),
              () => setSelected(undefined)
            )}
          >
            <Flex padding='0 var(--s) 0 0'>
              <Plus />
            </Flex>
            Добавить
          </GhostButton>
        )}
        {((userList.length !== 0 && isInputMode) || isSelectedMode) && (
          <GhostButton
            padding={'s'}
            height='s'
            onClick={fns(
              () => setMode('list'),
              () => setSelected(undefined)
            )}
          >
            <Flex padding='0 var(--s) 0 0'>
              <UserIcon />
            </Flex>
            Выбрать
          </GhostButton>
        )}
      </Flex>
      <Collapse
        className='collapse'
        from={{ opacity: isLisLMode ? 0 : 1, y: 0 }}
        to={{ opacity: isLisLMode ? 1 : 0, y: isLisLMode ? 0 : 20 }}
        isExpanded={isLisLMode}
      >
        <UserList
          isExpanded={isLisLMode}
          userList={userList}
          onRemove={fns(
            (user: User): unknown => removeUser(props.localStorageName, user),
            (): unknown => setTimeout(() => userList.length === 1 && setMode('input')),
            (): unknown => setTimeout(update)
          )}
          onSelect={fns(
            (user: User): unknown => setSelected(user),
            (): unknown => setMode('selected')
          )}
        />
      </Collapse>
      <Collapse
        className='collapse'
        from={{ opacity: !isLisLMode ? 0 : 1, y: 0 }}
        to={{ opacity: !isLisLMode ? 1 : 0, y: !isLisLMode ? 0 : 20 }}
        isExpanded={!isLisLMode}
      >
        {selected && (
          <Selected
            user={selected}
            onClick={fns(
              (): unknown => setMode('list'),
              (): unknown => setSelected(undefined)
            )}
          />
        )}
        <Form
          className='form'
          usernameHidden={!isInputMode}
          translations={t}
          selected={selected?.name}
          localStorageName={props.localStorageName}
          onSubmit={handleSubmit}
        />
      </Collapse>
    </div>
  )

  // private

  function handleSubmit(data: FormSubmitData): void {
    props.onSubmit(data, (user: User) => {
      addUser(props.localStorageName, user)
    })
  }
}
