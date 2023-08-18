import { ForwardedRef, forwardRef } from 'react'

import ABalloon from '~/abstract/balloon'
import { Point, RenderProps } from '~/abstract/popover'
import { AppearFrom } from '~/ui/animation'
import { c } from '~/utils/core'
import { setRefs } from '~/utils/react'

import { _getAnimationPosition } from '../_private'

BalloonComponent.displayName = 'ui-Tooltip-w-Balloon'

export interface Props extends RenderProps {
  content: React.ReactNode
  placement: Point
}

function BalloonComponent(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element {
  return (
    <AppearFrom duration={100} {..._getAnimationPosition(props.placement)} style={{ position: 'fixed', zIndex: 1 }}>
      <ABalloon
        className={c(props.className)}
        placement={props.placement}
        ref={setRefs(ref)}
        contentProps={{ className: 'content', style: { position: 'absolute' } }}
        renderArrow={forwardRef(function Element(props, ref): JSX.Element {
          return <div className='arrow' ref={setRefs(ref)} style={{ position: 'absolute' }} />
        })}
      >
        {props.content}
      </ABalloon>
    </AppearFrom>
  )
}

const Balloon = forwardRef(BalloonComponent)
Balloon.displayName = BalloonComponent.displayName
export default Balloon
