import './toolbar.scss'

import { useState } from 'react'

import { Point } from '~/entities/point'
import { GhostButton, PrimaryButton } from '~/ui/button'
import { ArrowLeft, ArrowRight, Trash } from '~/ui/icon'
import Line from '~/ui/line'
import Tooltip from '~/ui/tooltip'
import { c } from '~/utils/core'
import { stopPropagation } from '~/utils/dom-event'
import { fns } from '~/utils/function'
import { useUpdate } from '~/utils/hooks'
import { setRefs } from '~/utils/react'

import { NodeListController } from '../../..'
import { HistoryController } from '../../../_private'

Toolbar.displayName = 'decision-Editor-w-Toolbar'

export interface Props {
  className?: string
  nodeListController: NodeListController
  history: HistoryController
  addNode: (point: Partial<Point>) => void
  removeSelectedNodes: () => void
}

export default function Toolbar(props: Props): JSX.Element {
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
        <GhostButton onClick={fns(stopPropagation, () => props.history.undo())} square={true} height='s'>
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
        <GhostButton onClick={fns(stopPropagation, () => props.history.redo())} square={true} height='s'>
          <ArrowRight />
        </GhostButton>
      </Tooltip>
      <Line />
      <Tooltip delay={300} containerElement={headerElement} contents='Принятие решения' placement='tc'>
        <PrimaryButton
          onClick={(): void => props.addNode({ level: 'decisionPoint', name: 'new_filter' })}
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
          onClick={(): void => props.addNode({ level: 'arbitration', name: 'new_offer' })}
          square={true}
          height='s'
        >
          А
        </GhostButton>
      </Tooltip>
      <Tooltip delay={300} containerElement={headerElement} contents='Контрольная группа' placement='tc'>
        <GhostButton
          onClick={(): void => props.addNode({ level: 'controlGroup', name: 'new_offer' })}
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
          disabled={props.nodeListController.selection.value.length === 0}
        >
          <Trash />
        </GhostButton>
      </Tooltip>
    </div>
  )

  function subscribeOnUpdates(update: () => void, uns: (() => void)[]): void {
    uns.push(props.nodeListController.on('selection', update))
  }
}
