import './toolbar.scss'

import { memo, useState } from 'react'

import { GhostButton, PrimaryButton } from '~/ui/button'
import { ArrowLeft, ArrowRight, Trash } from '~/ui/icon'
import Line from '~/ui/line'
import Tooltip from '~/ui/tooltip'
import { c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'
import { Required } from '~/utils/types/object'

import { NodeListController } from '../../..'
import { Point } from '../../../../..'

ToolbarComponent.displayName = 'decision-Editor-w-Toolbar'

export interface Props {
  className?: string
  nodeList: NodeListController
  addNode: (point: Required<Partial<Point>, 'level'>) => void
  removeSelectedNodes: () => void
  undo: () => void
  redo: () => void
}

function ToolbarComponent(props: Props): JSX.Element {
  const [headerElement, setHeaderElement] = useState<null | HTMLElement>(null)

  useUpdate(subscribeOnUpdates)

  return (
    <div ref={setRefs(setHeaderElement)} className={c(props.className, Toolbar.displayName)}>
      <Tooltip
        delay={300}
        containerElement={headerElement}
        contents={
          <span>
            Предыдущее действие
            <br />
            <br />
            Ctrl+Z
          </span>
        }
        placement='tc'
      >
        <GhostButton onClick={fns(stopPropagation, () => props.undo())} square={true} height='s'>
          <ArrowLeft />
        </GhostButton>
      </Tooltip>
      <Tooltip
        delay={300}
        containerElement={headerElement}
        contents={
          <span>
            Предыдущее действие
            <br />
            <br />
            Ctrl+Shift+Z
          </span>
        }
        placement='tc'
      >
        <GhostButton onClick={fns(stopPropagation, () => props.redo())} square={true} height='s'>
          <ArrowRight />
        </GhostButton>
      </Tooltip>
      <Line />
      <Tooltip delay={300} containerElement={headerElement} contents='Принятие решения' placement='tc'>
        <PrimaryButton
          onClick={(): void => props.addNode({ level: 'decisionPoint', name: 'new_decisionPoint' })}
          square={true}
          height='s'
        >
          ПР
        </PrimaryButton>
      </Tooltip>
      <Tooltip delay={300} containerElement={headerElement} contents='Предложение' placement='tc'>
        <GhostButton
          onClick={(): void => props.addNode({ level: 'offer', name: 'new_offer' })}
          square={true}
          height='s'
        >
          П
        </GhostButton>
      </Tooltip>
      <Tooltip delay={300} containerElement={headerElement} contents='Арбитраж' placement='tc'>
        <GhostButton
          onClick={(): void => props.addNode({ level: 'arbitration', name: 'new_arbitration' })}
          square={true}
          height='s'
        >
          А
        </GhostButton>
      </Tooltip>
      <Tooltip delay={300} containerElement={headerElement} contents='Контрольная группа' placement='tc'>
        <GhostButton
          onClick={(): void => props.addNode({ level: 'controlGroup', name: 'new_controlGroup' })}
          square={true}
          height='s'
        >
          КГ
        </GhostButton>
      </Tooltip>
      <Line />
      <Tooltip delay={300} containerElement={headerElement} contents='Удалить (Backspace)' placement='tc'>
        <GhostButton
          onClick={props.removeSelectedNodes}
          square={true}
          height='s'
          disabled={props.nodeList.selection.value.length === 0}
        >
          <Trash />
        </GhostButton>
      </Tooltip>
    </div>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeList.on('selection', update))
  }
}

const Toolbar = memo(ToolbarComponent)
Toolbar.displayName = ToolbarComponent.displayName
export default Toolbar
