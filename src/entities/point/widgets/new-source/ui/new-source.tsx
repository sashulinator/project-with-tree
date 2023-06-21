import './new-source.css'

import React from 'react'

import UnstyledButton from '~/ui/unstyled-button'

import { Joint, JointProps } from '../../joint'

interface NewSourceProps {
  jointProps: Omit<JointProps, 'variant'>
  buttonProps: React.HTMLAttributes<HTMLButtonElement>
}

export default function NewSource(props: NewSourceProps): JSX.Element {
  const { jointProps, buttonProps } = props

  return (
    <div className='point-NewSource'>
      <UnstyledButton className='newRuleButton' {...buttonProps}>
        +
      </UnstyledButton>
      <Joint {...jointProps} variant='new' />
    </div>
  )
}

NewSource.displayName = 'NewSource'
