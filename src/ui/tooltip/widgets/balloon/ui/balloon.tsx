import { ForwardedRef, forwardRef } from 'react'

import ABalloon from '~/abstract/balloon'
import { Point } from '~/abstract/popover'
import { AppearFrom } from '~/ui/animation'
import { c } from '~/utils/core'
import { useMeasure } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { _getAnimationPosition } from '../_private'

BalloonComponent.displayName = 'ui-Tooltip-w-Balloon'

export interface Props {
  className: string
  contents: React.ReactNode
  placement: Point
}

function BalloonComponent(props: Props, ref: ForwardedRef<HTMLElement>): JSX.Element {
  const [measureRef, size] = useMeasure()

  return (
    <div ref={setRefs(ref)} style={{ ...size, pointerEvents: 'none' }}>
      <AppearFrom duration={100} {..._getAnimationPosition(props.placement)} style={{ position: 'fixed', zIndex: 1 }}>
        <ABalloon
          ref={setRefs(measureRef)}
          style={{ visibility: size.width ? 'visible' : 'hidden' }}
          className={c(props.className, BalloonComponent.displayName)}
          placement={props.placement}
          contentProps={{ className: 'content', style: { position: 'absolute' } }}
          renderArrow={forwardRef(function Element(props, ref): JSX.Element {
            return <div className='arrow' ref={setRefs(ref)} style={{ position: 'absolute' }} />
          })}
        >
          {props.contents}
        </ABalloon>
      </AppearFrom>
    </div>
  )
}

const Balloon = forwardRef(BalloonComponent)
Balloon.displayName = BalloonComponent.displayName
export default Balloon
