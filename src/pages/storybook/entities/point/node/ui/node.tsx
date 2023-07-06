// import Callout, { top } from '~/ui/callout'
import { Node } from '~/entities/point'

import { boardState } from '../mocks/board-state'
import { state } from '../mocks/node-state'

export default function NodePage(): JSX.Element {
  return (
    <div
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
          <svg height='500px' width='100%' style={{ border: '1px solid red' }}>
            <Node dataId='id' state={state} scale={boardState.scale.value} left={<div>left</div>} />
          </svg>
        </div>
      </div>
    </div>
  )
}
