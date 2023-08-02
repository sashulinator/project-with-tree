import Flex from '~/abstract/flex/ui/flex'

import Checkbox from '~/ui/checkbox'

export const uiCheckbox = {
  name: Checkbox.displayName,
  element: Page,
  description:
    ' Представляет собой foreignObject, который программным путем следит на изменением размеров контента и подстраивается под него',
  features: ['Подстраивается под размер контента', 'Координатность'],
  // extends: {
  //   name: NewNode.displayName,
  //   list: [''],
  // },
  type: ['ui'],
} as const

export function Page(): JSX.Element {
  return (
    <Flex dir='column' gap='xl' width='100%'>
      unchecked
      <Checkbox height='s' placeholder='placeholder' />
      checked
      <Checkbox checked height='s' placeholder='placeholder' />
      disabled
      <Checkbox disabled height='s' placeholder='placeholder' />
      checked disabled
      <Checkbox checked disabled height='s' placeholder='placeholder' />
    </Flex>
  )
}
