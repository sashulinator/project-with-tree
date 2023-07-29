import './node.css'

import { clsx } from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import { Item, ItemProps } from '~/ui/canvas'

import { dark } from '../themes/dark'
import { light } from '../themes/light'
import { emitter } from '~/shared/emitter'
import { c } from '~/utils/core'

emitter.emit('addTheme', { dark, light })

NodeComponent.displayName = 'decisionEditor-ui-Canvas-w-Node'

export interface NewNodeProps extends Omit<ItemProps, 'children' | 'title'> {
  title: React.ReactNode
  toolbar: React.ReactNode
  sourceLinks: React.ReactNode
  targetLinks: React.ReactNode
}

/**
 * Элемент Canvas с фичами
 */
function NodeComponent(props: NewNodeProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { title, toolbar, sourceLinks, targetLinks, ...itemProps } = props

  return (
    <Item
      {...itemProps}
      ref={ref}
      className={clsx(props.className, NodeComponent.displayName)}
      rootProps={{ style: { overflow: 'visible' } }}
    >
      <div className={c('toolbar')}>{toolbar}</div>
      <div className={c('title')}>{title}</div>
      <div className='links'>
        <div className='targetLinks'>{targetLinks}</div>
        <div className='sourceLinks'>{sourceLinks}</div>
      </div>
    </Item>
  )
}

const Node = forwardRef(NodeComponent)
Node.displayName = NodeComponent.displayName
export { Node }
