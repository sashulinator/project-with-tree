import './portrait-animation.scss'

import { a, useSpring } from '@react-spring/web'

import { Toast } from '~/abstract/toast'

interface ToastPortraitProps {
  toast: Toast
  children: React.ReactNode
}

export default function PortraitAnimation(props: ToastPortraitProps): JSX.Element {
  const isExpanded = !props.toast.isExiting
  const toastHeight = 200
  const { y } = useSpring({
    config: { duration: props.toast.isEntering ? props.toast.maxEnteringTransition : props.toast.maxExitingTransition },
    from: { height: toastHeight, y: -toastHeight },
    to: {
      height: isExpanded ? toastHeight : 0,
      y: isExpanded ? 0 : -toastHeight,
    },
  })

  return (
    <a.div data-x='ToastPortraitAnimation' style={{ display: 'flex', alignItems: 'end', y }}>
      {props.children}
    </a.div>
  )
}
