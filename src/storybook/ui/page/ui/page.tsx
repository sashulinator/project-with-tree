import './page.scss'

import { createElement, useState } from 'react'

import { Any, c } from '~/utils/core'

import { Controls } from '..'

Page.displayName = 'story-Page'

export interface Props {
  className?: string
  controls: ({ name: string; input: string } & Record<string, Any>)[]
  element: () => JSX.Element
}

export default function Page(props: Props): JSX.Element {
  const [state, setState] = useState({})

  return (
    <div className={c(props.className, Page.displayName)}>
      <div className='showcase'>{createElement(props.element, state)}</div>
      <Controls className='controls' controls={props.controls} state={state} setState={setState} />
    </div>
  )
}
