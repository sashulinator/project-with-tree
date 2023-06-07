// import Callout, { top } from '~/ui/callout'
import { forwardRef } from 'react'

import Balloon from '~/ui/balloon'
import { BalloonProps } from '~/ui/balloon/types/balloon-props'
import Callout from '~/ui/callout'
import { ContentProp } from '~/ui/callout/types/callout-props'
import { useBoolean } from '~/utils/hooks'

export default function CalloutPage(): JSX.Element {
  const [isDefaultOpen, , , toggleDefault] = useBoolean(false)

  return (
    <main className='pt-5rem'>
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
              isOpen={isDefaultOpen}
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
    </main>
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
