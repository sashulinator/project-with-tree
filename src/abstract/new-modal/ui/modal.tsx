import './modal.css'

import { createPortal } from 'react-dom'

import { c } from '../../../utils/core'

Modal.displayName = 'na-Modal'

export interface Props extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  children: React.ReactNode
  containerElement: Element
  opened: boolean
}

export default function Modal(props: Props): JSX.Element | null {
  const { containerElement, children, opened, ...divProps } = props

  if (!opened) return null

  return createPortal(
    <div {...divProps} className={c(props.className, Modal.displayName)}>
      {children}
    </div>,
    containerElement
  )
}
