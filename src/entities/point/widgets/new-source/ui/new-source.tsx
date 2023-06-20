import './new-source.css'

import React from 'react'

import { Joint, JointProps } from '../../../ui/joint'

interface NewSourceProps {
  jointProps: Omit<JointProps, 'variant'>
  buttonProps: React.HTMLAttributes<HTMLButtonElement>
}

export default function NewSource(props: NewSourceProps): JSX.Element {
  const { jointProps, buttonProps } = props

  return (
    <div className='point-NewSource'>
      <button {...buttonProps}>+</button>
      <Joint {...jointProps} variant='new' />
    </div>
  )
}

NewSource.displayName = 'NewSource'
