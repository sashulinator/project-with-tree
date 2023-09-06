import './modal.scss'

import { useEffect, useLayoutEffect, useRef } from 'react'

import AModal from '~/abstract/new-modal'
import { AppearFrom } from '~/ui/animation'
import { OrdinaryButton } from '~/ui/button'
import { Close } from '~/ui/icon'
import { c } from '~/utils/core'
import { getFirstFocusable } from '~/utils/dom-event/get-first-focusable'
import { useDebounce } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

Modal.displayName = 'ui-Modal'

export interface Props {
  className?: string
  children: React.ReactNode
  containerElement?: Element | undefined
  opened?: unknown
  blured?: boolean | undefined
  firstFocused?: boolean
  onDismiss?: ((event: React.MouseEvent | MouseEvent | KeyboardEvent) => void) | undefined
}

export default function Modal(props: Props): JSX.Element {
  const { blured = true, firstFocused } = props

  const contentRef = useRef<HTMLElement>(null)
  const [opened, setOpened, setOpenedEmmidiatele] = useDebounce(Boolean(props.opened), 300)
  const closing = opened === true && Boolean(props.opened) === false

  useLayoutEffect(() => {
    if (contentRef.current === null) return
    if (firstFocused) getFirstFocusable(contentRef.current)?.focus()
  }, [])

  useEffect(() => {
    if (props.opened !== opened) {
      if (Boolean(props.opened)) {
        setOpenedEmmidiatele(true)
      } else {
        setOpened(false)
      }
    }
  }, [props.opened])

  return (
    <AModal
      className={c(props.className, Modal.displayName, blured && `--blured`, closing ? `--closing` : '--opened')}
      containerElement={props.containerElement || document.body}
      opened={opened}
      onDismiss={props.onDismiss}
      firstFocused={true}
    >
      <AppearFrom
        duration={closing ? 100 : 200}
        from={{ y: closing ? 0 : 33, opacity: closing ? 0 : 1 }}
        to={{ y: closing ? -33 : 0, opacity: closing ? 1 : 0 }}
        className='wrapper'
      >
        <OrdinaryButton round={true} height={'l'} className='closeButton' onClick={(e): void => props.onDismiss?.(e)}>
          <Close />
        </OrdinaryButton>
        <div ref={setRefs(contentRef)} className='content'>
          {props.children}
        </div>
      </AppearFrom>
    </AModal>
  )
}
