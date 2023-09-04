import './modal.scss'

import AModal from '~/abstract/new-modal'
import { c } from '~/utils/core'

Modal.displayName = 'ui-Modal'

export interface Props {
  className?: string
  children: React.ReactNode
  containerElement?: Element | undefined
  opened?: unknown
  blured?: boolean | undefined
  onDismiss?:
    | ((event: React.MouseEvent<HTMLDivElement, MouseEvent> | React.KeyboardEvent<HTMLDivElement>) => void)
    | undefined
}

export default function Modal(props: Props): JSX.Element {
  const { blured = true } = props

  return (
    <AModal
      className={c(props.className, Modal.displayName, blured && `--blured`)}
      containerElement={props.containerElement || document.body}
      opened={Boolean(props.opened)}
      onDismiss={props.onDismiss}
    >
      {props.children}
    </AModal>
  )
}
