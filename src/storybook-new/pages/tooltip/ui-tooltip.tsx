import Flex from '~/abstract/flex/ui/flex'
import { GhostButton } from '~/ui/button'
import Tooltip from '~/ui/tooltip'

export const uiTooltip = {
  name: Tooltip.displayName,
  element: Page,
  description: 'Любой элемент с лейблом',
  features: ['Подстраивается под размер контента', 'Координатность'],
  // extends: {
  //   name: NewNode.displayName,
  //   list: [''],
  // },
  type: ['ui'],
} as const

export function Page(): JSX.Element {
  return (
    <>
      <Flex dir='row' gap='xl' width='100%'>
        <Tooltip placement='tc' content='hello'>
          <GhostButton>Target</GhostButton>
        </Tooltip>
      </Flex>
    </>
  )
}
