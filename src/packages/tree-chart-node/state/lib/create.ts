import mitt, { Emitter } from 'mitt'

import { EventNames } from '../types/event-names'
import { Events } from '../types/events'
import { Position, State } from '../types/state'

export function create(defaultState?: State | undefined): State {
  const m: Emitter<Events> = mitt()

  const chartState: State = {
    mitt: m,
    position: { x: 0, y: 0 },
    setPosition,
    ...defaultState,
  }

  m.on(EventNames.setPosition, (event) => {
    chartState.position = event.position
  })

  function setPosition(position: Position): void {
    m.emit(EventNames.setPosition, { position })
  }

  return chartState
}
