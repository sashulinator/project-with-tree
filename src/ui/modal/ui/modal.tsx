import './modal.scss'

import { useLayoutEffect, useRef } from 'react'

import AModal from '~/abstract/new-modal'
import { PrimaryButton } from '~/ui/button'
import { Close } from '~/ui/icon'
import { c } from '~/utils/core'
import { getFirstFocusable } from '~/utils/dom-event/get-first-focusable'
import { setRefs } from '~/utils/react'

Modal.displayName = 'ui-Modal'

export interface Props {
  className?: string
  children: React.ReactNode
  containerElement?: Element | undefined
  opened?: unknown
  blured?: boolean | undefined
  firstFocused?: boolean
  onDismiss?: ((event: React.MouseEvent | React.KeyboardEvent) => void) | undefined
}

export default function Modal(props: Props): JSX.Element {
  const { blured = true, firstFocused } = props

  const contentRef = useRef<HTMLElement>(null)

  useLayoutEffect(() => {
    if (contentRef.current === null) return
    if (firstFocused) getFirstFocusable(contentRef.current)?.focus()
  })

  return (
    <AModal
      className={c(props.className, Modal.displayName, blured && `--blured`)}
      containerElement={props.containerElement || document.body}
      opened={Boolean(props.opened)}
      onDismiss={props.onDismiss}
      firstFocused={true}
    >
      <div className='wrapper'>
        <PrimaryButton round={true} height={'l'} className='closeButton' onClick={props.onDismiss}>
          <Close />
        </PrimaryButton>
        <div ref={setRefs(contentRef)} className='content'>
          {props.children}
        </div>
      </div>
    </AModal>
  )
}
