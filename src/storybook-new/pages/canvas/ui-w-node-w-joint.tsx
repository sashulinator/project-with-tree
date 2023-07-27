import Flex from '~/abstract/flex/ui/flex'

import { Joint } from '~/ui/canvas/widgets/new-node/widgets/joint'

export const aCanvasWNodeWJoint = {
  name: Joint.displayName,
  element: Page,
  description: 'Представляет собой кнопку',
  features: ['Вариативность'],
  // extends: {
  //   name: NewNode.displayName,
  //   list: [''],
  // },
  type: ['ui', 'widget'],
} as const

export function Page(): JSX.Element {
  return (
    <Flex dir='column' gap='xl' width='100%'>
      new
      <Joint linkId='test' variant='new' />
      linked
      <Joint linkId='test' variant='linked' />
      unlinked
      <Joint linkId='test' variant='unlinked' />
    </Flex>
  )
}
