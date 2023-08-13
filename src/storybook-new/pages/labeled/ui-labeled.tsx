import Flex from '~/abstract/flex/ui/flex'
import Input from '~/ui/input'
import Labeled from '~/ui/labeled'

export const uiLabeled = {
  name: Labeled.displayName,
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
        <Labeled htmlFor='test2' label='Long name'>
          <Input placeholder='Please enter your long name' />
        </Labeled>
        <Labeled htmlFor='test' label='Test'>
          <Input placeholder='Test' />
        </Labeled>
      </Flex>

      <Flex dir='row' gap='xl' width='100%'>
        <Labeled direction='horizontal' htmlFor='test2' label='Long name'>
          <Input placeholder='Please enter your long name' />
        </Labeled>
        <Labeled direction='horizontal' htmlFor='test' label='Test'>
          <Input placeholder='Test' />
        </Labeled>
      </Flex>
    </>
  )
}
