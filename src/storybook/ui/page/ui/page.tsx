import './page.scss'

import { createElement, useState } from 'react'

import type { Config } from '~/storybook/types'
import { c } from '~/utils/core'
import { setPath } from '~/utils/dictionary'

import { Controls } from '..'

Page.displayName = 'story-Page'

export type Props = Config<Record<string, unknown>>

export default function Page(props: Props): JSX.Element {
  const [state, setState] = useState(buildState())

  return (
    <div className={c(Page.displayName)}>
      <div className='panel --top'>
        <div className='description'>{props.getDescription?.()}</div>
        <div className='showcase'>{createElement(props.element, { state, setState })}</div>
      </div>
      <div className='panel --bottom'>
        <Controls className='controls' controls={props.controls} state={state} setState={setState} />
      </div>
    </div>
  )

  function buildState(): Record<string, unknown> {
    let state = {}
    props.controls.forEach((control) => {
      state = setPath(control?.path || [control.name], control.defaultValue, state)
    })
    return state
  }
}
