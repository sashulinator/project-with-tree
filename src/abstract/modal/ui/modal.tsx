import './modal.css'

import { MouseEventHandler, useCallback, useEffect, useRef, useState } from 'react'

import { GhostButton } from '~/ui/button'
import { H2 } from '~/ui/heading'
import { c } from '~/utils/core'

import Portal, { createContainer } from '../widget/ui/portal/portal'

const MODAL_CONTAINER_ID = 'modal-container-id'

type Props = {
  title: string
  onClose?: () => void
  children: React.ReactNode | React.ReactNode[]
}

Modal.displayName = 'a-Modal'

function Modal(props: Props): JSX.Element | null {
  const { title, onClose, children } = props

  const rootRef = useRef<HTMLDivElement>(null)
  const [isMounted, setMounted] = useState(false)

  useEffect(() => {
    createContainer({ id: MODAL_CONTAINER_ID })
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleWrapperClick = (event: MouseEvent): void => {
      const { target } = event

      if (target instanceof Node && rootRef.current === target) {
        onClose?.()
      }
    }
    const handleEscapePress = (event: KeyboardEvent): void => {
      if (event.key === 'Escape') {
        onClose?.()
      }
    }

    window.addEventListener('click', handleWrapperClick)
    window.addEventListener('keydown', handleEscapePress)

    return () => {
      window.removeEventListener('click', handleWrapperClick)
      window.removeEventListener('keydown', handleEscapePress)
    }
  }, [onClose])

  const handleClose: MouseEventHandler<HTMLDivElement | HTMLButtonElement> = useCallback(() => {
    onClose?.()
  }, [onClose])

  return isMounted ? (
    <Portal id={MODAL_CONTAINER_ID}>
      <div className={c(Modal.displayName)} ref={rootRef} data-testid='wrap'>
        <div className='content'>
          <GhostButton onClick={handleClose} data-testid='modal-close-button'>
            Х
          </GhostButton>
          <H2 className='title'>{title}</H2>
          {children}
        </div>
      </div>
    </Portal>
  ) : null
}

export default Modal
