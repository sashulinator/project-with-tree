import './page.scss'

import { createElement, useState } from 'react'

import { Any, Key, c } from '~/utils/core'
import { setPath } from '~/utils/dictionary'

import { Controls } from '..'

Page.displayName = 'story-Page'

export interface Props {
  className?: string
  controls: ({ name: string; input: string; path?: Key[]; defaultValue: unknown } & Record<string, Any>)[]
  element: () => JSX.Element
}

export default function Page(props: Props): JSX.Element {
  const [state, setState] = useState(buildState())

  return (
    <div className={c(props.className, Page.displayName)}>
      <div className='showcase'>{createElement(props.element, state)}</div>
      <Controls className='controls' controls={props.controls} state={state} setState={setState} />
    </div>
  )

  function buildState(): Record<string, unknown> {
    let state = {}
    props.controls.forEach((control) => {
      state = setPath(control.path || [control.name], control.defaultValue, state)
    })
    return state
  }
}
