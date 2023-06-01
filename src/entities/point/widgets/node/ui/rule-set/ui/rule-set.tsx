import './rule-set.css'

import clsx from 'clsx'
import React from 'react'

import { Id } from '~/utils/core'

export interface RuleSetProps {
  id: Id
  children: React.ReactNode
  isLinked: boolean
  onAddLink: () => void
}

export function RuleSet(props: RuleSetProps): JSX.Element {
  return (
    <div className='RuleSet' data-id={props.id}>
      {props.children}
      {<button className={clsx('addLink', props.isLinked && '--linked')} onClick={handleAddLink} />}
    </div>
  )

  // Private

  function handleAddLink(e: React.MouseEvent): void {
    e.stopPropagation()
    props.onAddLink()
  }
}
