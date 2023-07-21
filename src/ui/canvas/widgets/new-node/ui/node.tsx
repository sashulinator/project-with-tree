import './node.css'

import { clsx } from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

import { Item, ItemProps } from '../../item'
import Flex from '~/abstract/flex'
import Input, { useChangeOnBlurStrategy } from '~/ui/input'

import { dark } from '../themes/dark'
import { light } from '../themes/light'
import { emitter } from '~/shared/emitter'
import { Joint } from '../widgets/joint'
import { Id } from '~/utils/core'

emitter.emit('addTheme', { dark, light })

NodeComponent.displayName = 'ui-Canvas-w-Node'

export interface NewNodeProps extends ItemProps {
  title: string
  isOneTarget?: boolean
  targetLinks: { id: Id }[]
  onTitleChange: (title: string) => void
}

/**
 * Элемент Canvas с фичами
 * 1. Title
 * 2. Перетаскивание по тайтлу
 * 3. Стили позиционирования
 */
function NodeComponent(props: NewNodeProps, ref: ForwardedRef<HTMLDivElement>): JSX.Element {
  const { dataId, title, isOneTarget, targetLinks, ...itemProps } = props

  return (
    <Item
      {...itemProps}
      dataId={dataId}
      ref={ref}
      className={clsx(props.className, NodeComponent.displayName)}
      rootProps={{ style: { overflow: 'visible' } }}
    >
      <Flex className='container'>
        <Flex className='titleSection' width='100%'>
          <Flex className='title' width='100%' margin='var(--l)'>
            <Input
              {...useChangeOnBlurStrategy({
                transparent: true,
                value: title,
                cannotBeEmpty: true,
                onChange: (ev): void => props.onTitleChange(ev.currentTarget.value),
              })}
            />
          </Flex>
        </Flex>
        <Flex className='rulesSection'>
          {isOneTarget && (
            <Flex className='oneTargetLinks'>
              {targetLinks.map(({ id }) => {
                return <Joint key={id} linkId={id} variant='new' />
              })}
            </Flex>
          )}
        </Flex>
      </Flex>
    </Item>
  )
}

const NewNode = forwardRef(NodeComponent)
NewNode.displayName = NodeComponent.displayName
export { NewNode }
