import { useMemo } from 'react'

import { CanvasState as ChartState, Node } from '~/entities/decision'
import Canvas from '~/entities/decision/ui/canvas/ui/canvas'
import { ActionHistory } from '~/utils/action-history'
import { assertDefined } from '~/utils/core'
import { useUpdate } from '~/utils/hooks'
import ChartLink, { ChartLinkProps } from '~/widgets/chart-link'

interface DecisionEditorProps {
  chartState: ChartState
  history: ActionHistory
}

export default function DecisionEditor(props: DecisionEditorProps): JSX.Element {
  const itemStates = Object.values(props.chartState.pointStates.value)

  useUpdate(updateOnEvents)

  const links = useMemo(() => {
    return itemStates.reduce<ChartLinkProps[]>((acc, sourceState) => {
      const linksProps = sourceState.ruleList.value?.reduce<ChartLinkProps[]>((acc, rule) => {
        if (!rule.pointId) {
          return acc
        }
        const targetState = props.chartState.pointStates.value[rule.pointId]
        assertDefined(targetState)
        const linkProps: ChartLinkProps = {
          targetState,
          sourceState,
          rule: rule,
        }
        acc.push(linkProps)
        return acc
      }, [])
      if (linksProps) acc = [...acc, ...linksProps]
      return acc
    }, [])
  }, [itemStates.length])

  return (
    <Canvas canvasState={props.chartState}>
      {links?.map((link) => {
        return <ChartLink key={`${link.targetState.point.id}${link.sourceState.point.id}`} {...link} />
      })}
      {itemStates.map((state) => {
        return <Node key={state.point.id} state={state} decisionState={props.chartState} />
      })}
    </Canvas>
  )

  // Private

  function updateOnEvents(update: () => void): void {
    props.chartState.emitter.on('setItemStates', update)
    props.chartState.emitter.on('setItemStates', update)
  }
}
