import React from 'react'

import Flex from '~/abstract/flex'

interface SectionProps {
  header?: React.ReactNode
  toolbar?: React.ReactNode
  children: React.ReactNode
}

export default function Section(props: SectionProps): JSX.Element {
  return (
    <Flex dir='column'>
      {props.header}
      <hr style={{ width: '100%', opacity: '.2' }} />
      {props.toolbar}
      <Flex>
        <Flex width='50%' padding='2rem 2rem 2rem 0'>
          {props.children}
        </Flex>
        <Flex width='50%' padding='2rem' className='bg' style={{ borderRadius: 'var(--xl)' }}>
          {props.children}
        </Flex>
      </Flex>
    </Flex>
  )
}
