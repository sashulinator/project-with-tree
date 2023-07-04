// import Callout, { top } from '~/ui/callout'
import { Node } from '~/ui/canvas'
import { emptyFn } from '~/utils/function/empty-fn'

export default function NodePage(): JSX.Element {
  return (
    <main className='pt-5rem'>
      <div
        // ref={setContainerEl}
        className='w-20rem bg-secondary p-2.5em mt-2.5rem'
        style={{
          borderRadius: '20px',
          border: '1px solid var(--input_borderColor)',
          width: '100%',
        }}
      >
        <h2 className='mb-2rem'>Node</h2>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Default
          </label>

          <div>
            <svg height='100%' width='100%' style={{ border: '1px solid red' }}>
              <Node
                dataId='test'
                nodeTitle='Hello World'
                width={200}
                height={200}
                position={{ x: 0, y: 0 }}
                lastPosition={{ x: 0, y: 0 }}
                scale={1}
                onMove={(): void => console.log('move!')}
                isDrag={emptyFn}
                left={<div>left</div>}
              >
                Children
              </Node>
            </svg>
          </div>
        </div>
      </div>
    </main>
  )
}
