// import Callout, { top } from '~/ui/callout'
import { Point } from 'dom-align-ts'
import { useState } from 'react'

import Popover from '~/abstract/popover'
import { useBoolean } from '~/utils/hooks'

export default function PopoverPage(): JSX.Element {
  const [isOpen, , , toggle] = useBoolean(false)
  const [placement, setPlacement] = useState<Point | ''>('')
  const [containerEl, setContainerEl] = useState<HTMLDivElement | null>(null)
  const [pointTarget, setPointTarget] = useState<Point | ''>('')
  const [pointSource, setPointSource] = useState<Point | ''>('')
  const [contentPosition, setContentPosition] = useState<CSSStyleDeclaration['position']>('fixed')
  const [isMainContainerRelative, , , toggleIsMainContainerRelative] = useBoolean(false)
  const [isPortalToMainContainer, , , toggleIsPortalToMainContainer] = useBoolean(false)
  const [adjustX, , , toggleIsAdjustX] = useBoolean(false)
  const [adjustY, , , toggleIsAdjustY] = useBoolean(false)
  const [alwaysByViewport, , , toggleIsAlwaysByViewport] = useBoolean(false)

  return (
    <div
      ref={setContainerEl}
      className='bg-secondary p-2.5em mt-2.5rem'
      style={{
        width: '100%',
        borderRadius: '20px',
        border: '1px solid',
        borderColor: isMainContainerRelative ? 'red' : 'var(--input_borderColor)',
        position: 'relative',
      }}
    >
      <h2 className='mb-2rem'>Popover</h2>
      By default the content portals to the body <br />
      You can portal content to the main container, but don&apos;t forget to set a content position to
      &apos;absolute&apos;
      <div className='mt-1rem flex flex-col'>
        <div className='mb-1rem'>
          <div>
            <input
              type='checkbox'
              id='isMainContainerRelative'
              checked={isMainContainerRelative}
              onChange={toggleIsMainContainerRelative}
            />
            <label htmlFor='isMainContainerRelative' className='label'>
              Main container position &apos;relative&apos;
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='isPortalToMainContainer'
              checked={isPortalToMainContainer}
              onChange={toggleIsPortalToMainContainer}
            />
            <label htmlFor='isPortalToMainContainer' className='label'>
              Portal to main Container
            </label>
          </div>
          <div>
            <input type='checkbox' id='isAdjustX' checked={adjustX} onChange={toggleIsAdjustX} />
            <label htmlFor='isAdjustX' className='label'>
              adjustX
            </label>
          </div>
          <div>
            <input type='checkbox' id='isAdjustY' checked={adjustY} onChange={toggleIsAdjustY} />
            <label htmlFor='isAdjustY' className='label'>
              adjustY
            </label>
          </div>
          <div>
            <input
              type='checkbox'
              id='alwaysByViewport'
              checked={alwaysByViewport}
              onChange={toggleIsAlwaysByViewport}
            />
            <label htmlFor='alwaysByViewport' className='label'>
              always By Viewport
            </label>
          </div>
          <div>
            <label htmlFor='placement' className='label mb-0.3rem mr-0.5rem'>
              Placement
            </label>
            <PointDropdown
              id='placement'
              onChange={(v): void => {
                setPlacement(v)
                setPointTarget('')
                setPointSource('')
              }}
              value={placement}
            />
          </div>
          <div>
            <label htmlFor='pointTarget' className='label mb-0.3rem mr-0.1rem'>
              Points target
            </label>
            <PointDropdown
              id='pointTarget'
              onChange={(v) => {
                setPointTarget(v)
                setPlacement('')
              }}
              value={pointTarget}
            />
            <label htmlFor='pointSource' className='label mb-0.3rem mr-0.1rem ml-0.1rem'>
              source
            </label>
            <PointDropdown
              id='pointSource'
              onChange={(v) => {
                setPointSource(v)
                setPlacement('')
              }}
              value={pointSource}
            />
          </div>
          <div>
            <label htmlFor='position' className='label mb-0.3rem mr-0.5rem'>
              Content position
            </label>
            <PositionDropdown id='position' onChange={setContentPosition} value={contentPosition} />
          </div>
        </div>
        <div>
          <Popover
            overflow={{ adjustX, adjustY, alwaysByViewport }}
            containerElement={isPortalToMainContainer ? containerEl : undefined}
            opened={isOpen}
            deps={[adjustX, adjustY, contentPosition]}
            placement={placement ? placement : undefined}
            points={pointTarget && pointSource ? [pointSource, pointTarget] : undefined}
            content={
              <span
                style={{
                  position: contentPosition as any,
                  background: 'yellow',
                  border: '1px solid black',
                  top: '4px',
                  left: '300px',
                }}
              >
                Content Content Content Content
                <br />
                Content Content Content Content Content Content Content
                <br />
                Content Content Content
              </span>
            }
          >
            <button onClick={toggle}>Target</button>
          </Popover>
        </div>
      </div>
    </div>
  )
}

// Private

interface PointsDropdownProps {
  onChange: (value: Point) => void
  id: string
  value: string | undefined
}

export function PointDropdown(props: PointsDropdownProps): JSX.Element {
  const options: (Point | '')[] = ['', 'bc', 'bl', 'br', 'cc', 'cl', 'cr', 'tc', 'tl', 'tr']

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={(e) => props.onChange(e.target.value as Point)} id={props.id} name={props.id} value={props.value}>
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

interface PositionDropdownProps {
  onChange: (value: CSSStyleDeclaration['position']) => void
  id: string
  value: CSSStyleDeclaration['position'] | undefined
}

function PositionDropdown(props: PositionDropdownProps): JSX.Element {
  const options: CSSStyleDeclaration['position'][] = ['', 'fixed', 'relative', 'absolute']

  return (
    // eslint-disable-next-line jsx-a11y/no-onchange
    <select onChange={(e) => props.onChange(e.target.value)} id={props.id} name={props.id} value={props.value}>
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
