// import Callout, { top } from '~/ui/callout'
import { Point } from 'dom-align-ts'
import { useState } from 'react'

import Balloon from '~/ui/balloon'

export default function BalloonPage(): JSX.Element {
  const [placement, setPlacement] = useState<Point>('tc')

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
        <h2 className='mb-2rem'>Balloon</h2>
        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Default
          </label>

          <div>
            <div className='pb-2rem'>
              <label htmlFor='placement' className='label mb-0.3rem mr-0.5rem'>
                Placement
              </label>
              <PointDropdown
                id='placement'
                onChange={(v): void => {
                  setPlacement(v)
                }}
                value={placement}
              />
            </div>
            <Balloon placement={placement}>
              <span>
                Default
                <br />
                Default
                <br />
                Default
                <br />
                Default
              </span>
            </Balloon>
          </div>
        </div>
      </div>
    </main>
  )
}

// Private

interface PointsDropdownProps {
  onChange: (value: Point) => void
  id: string
  value: string | undefined
}

export function PointDropdown(props: PointsDropdownProps): JSX.Element {
  const options: (Point | '')[] = ['', 'bc', 'bl', 'br', 'cl', 'cr', 'tc', 'tl', 'tr']

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select
      onChange={(e): void => props.onChange(e.target.value as Point)}
      id={props.id}
      name={props.id}
      value={props.value}
    >
      {options.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      })}
    </select>
  )
}
