import './sift.css'

import { Id } from '~/utils/dictionary'

import Input, { useChangeOnBlurStrategy } from '~/ui/input'
import { GestureDragEvent } from '~/ui/canvas/widgets/item/ui/item'
import { Joint, NewNode } from '~/ui/canvas'
import { GhostButton } from '~/ui/button'
import { Trash } from '~/ui/icon'

NewSiftNode.displayName = 'decisionCanvas-w-Node-v-Sift'

export interface NewSiftNodeProps {
  x: number | string
  y: number | string
  dataId: Id
  title: string
  remove: (id: Id) => void
  onGestureDrug: (event: GestureDragEvent) => void
  onTitleChange: (value: string) => void
}

/**
 * Node типа sift
 */
export function NewSiftNode(props: NewSiftNodeProps): JSX.Element {
  const { onTitleChange, remove, ...nodeProps } = props

  const descriptionInputProps = useChangeOnBlurStrategy({
    value: props.title,
    cannotBeEmpty: true,
    transparent: true,
    height: 'l',
    placeholder: 'Описание',
    fieldProps: { className: 'titleInputField' },
    onChange: (e) => onTitleChange(e.currentTarget.value),
  })

  return (
    <NewNode
      {...nodeProps}
      className={NewSiftNode.displayName}
      title={<Input {...descriptionInputProps} />}
      toolbar={
        <>
          <GhostButton style={{ padding: '0 1rem', fontSize: '0.6em' }}>Параллельно</GhostButton>
          <GhostButton round={true}>
            <Trash />
          </GhostButton>
        </>
      }
      sourceLinks={
        <div>
          <GhostButton round={true} height='s'>
            <Joint variant='new' linkId={'id'} />
          </GhostButton>
        </div>
      }
      targetLinks={
        <div style={{ display: 'flex', width: '100%', alignItems: 'end', flexDirection: 'column' }}>
          <div style={{ display: 'flex' }}>
            <GhostButton round={true} height='s'>
              <Joint variant='new' linkId={'id'} />
            </GhostButton>
          </div>
          <GhostButton round={true} height='s'>
            <Joint variant='linked' linkId={'id'} />
          </GhostButton>
        </div>
      }
    />
  )

  // Private
}
