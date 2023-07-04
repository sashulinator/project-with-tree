import './new-source.css'

import React from 'react'

import UnstyledButton from '~/ui/unstyled-button'

import { Joint, JointProps } from '../../joint'

NewSource.displayName = 'point-NodeNewSource'

export interface NewSourceProps {
  jointProps: Omit<JointProps, 'variant'>
  buttonProps: React.HTMLAttributes<HTMLButtonElement>
}

export function NewSource(props: NewSourceProps): JSX.Element {
  const { jointProps, buttonProps } = props

  return (
    <div className={NewSource.displayName}>
      <UnstyledButton className='newRuleButton' {...buttonProps}>
        +
      </UnstyledButton>
      <Joint {...jointProps} variant='new' />
    </div>
  )
}
