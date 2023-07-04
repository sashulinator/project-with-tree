import './rule-set.css'

import React from 'react'

import { Joint, JointProps } from '../../joint'

export interface RuleSetProps {
  children: React.ReactNode
  jointProps: JointProps
}

export function RuleSet(props: RuleSetProps): JSX.Element {
  return (
    <div className='RuleSet'>
      {props.children}
      <Joint {...props.jointProps} />
    </div>
  )
}
