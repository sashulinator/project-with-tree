import { useMemo } from 'react'

import { CanvasState as ChartState, Node, Point } from '~/entities/decision'
import Canvas from '~/entities/decision/ui/canvas/ui/canvas'
import { assertDefined } from '~/utils/core'
import { useEventListener, useUpdate } from '~/utils/hooks'
import ChartLink, { ChartLinkProps } from '~/widgets/chart-link'

interface DecisionEditorProps {
  chartState: ChartState
}

export default function DecisionEditor(props: DecisionEditorProps): JSX.Element {
  const itemStates = Object.values(props.chartState.pointStates)

  useUpdate(updateOnEvents)

  useEventListener('keydown', (e) => {
    if (e.metaKey && e.key === 'z') {
      if (e.shiftKey) {
        props.chartState.history.next()
      } else {
        props.chartState.history.previous()
      }
    }
  })

  const links = useMemo(() => {
    return itemStates.reduce<ChartLinkProps<Point>[]>((acc, sourceState) => {
      const linksProps = sourceState.links?.map((link) => {
        const targetState = props.chartState.pointStates[link.id]
        assertDefined(targetState)
        const linkProps: ChartLinkProps<Point> = {
          targetState,
          sourceState,
          link,
        }
        return linkProps
      })
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
