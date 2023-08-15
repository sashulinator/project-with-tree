// import Callout, { top } from '~/ui/callout'
import { forwardRef } from 'react'

import Balloon, { BalloonProps } from '~/ui/balloon'
import Callout, { ContentProp } from '~/ui/callout'
import { useBoolean } from '~/utils/hooks'

export default function CalloutPage(): JSX.Element {
  const [isDefaultOpen, , , toggleDefault] = useBoolean(false)

  return (
    <div
      // ref={setContainerEl}
      className='w-20rem bg-secondary p-2.5em mt-2.5rem'
      style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)', position: 'relative' }}
    >
      <h2 className='mb-2rem'>Callout</h2>
      <div className='mt-1rem flex flex-col'>
        <label htmlFor='readonly' className='label mb-0.25rem'>
          Default
        </label>
        <div>
          <Callout<BalloonProps>
            opened={isDefaultOpen}
            // contentProps={}
            placement='bc'
            overflow={{ adjustX: true, adjustY: true, alwaysByViewport: true }}
            contentProps={{
              children: <div>Hello</div>,
            }}
            renderContent={BalloonWrapper}
          >
            <button onClick={toggleDefault} style={{ padding: '70px' }}>
              Toggle
            </button>
          </Callout>
        </div>
      </div>
    </div>
  )
}

const BalloonWrapper = forwardRef<HTMLDivElement, ContentProp & BalloonProps>(function BubbleWrapper(
  props: ContentProp & BalloonProps,
  ref
) {
  return (
    <div ref={ref}>
      <Balloon {...props} />
    </div>
  )
})
