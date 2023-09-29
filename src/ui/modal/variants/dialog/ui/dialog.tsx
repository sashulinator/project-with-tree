import './dialog.css'

import { useForm } from 'react-hook-form'

import Flex from '~/abstract/flex'
import { GhostButton, PrimaryButton } from '~/ui/button'
import Modal, { ModalProps } from '~/ui/modal'
import { c } from '~/utils/core'

export interface Props extends Omit<ModalProps, 'children'> {
  text: string
  onSubmit: () => void
  className?: string
}

Dialog.displayName = 'ui-Modal-v-Dialog'

function Dialog(props: Props): JSX.Element {
  const { handleSubmit } = useForm()

  return (
    <Modal {...props}>
      <Flex
        className={c(Dialog.displayName, props.className ? props.className : '')}
        as='form'
        mainAxis='space-between'
        dir='column'
        padding='20px'
        gap='xxxl'
        // eslint-disable-next-line @typescript-eslint/no-misused-promises
        onSubmit={handleSubmit(props.onSubmit)}
      >
        <h2>{props.text}</h2>
        <Flex gap='l' crossAxis='center' mainAxis='end'>
          <GhostButton onClick={props.onDismiss}>Нет</GhostButton>
          <PrimaryButton type='submit'>Да</PrimaryButton>
        </Flex>
      </Flex>
    </Modal>
  )
}

export default Dialog
