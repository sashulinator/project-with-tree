import mitt, { Emitter } from 'mitt'

import { EventNames } from '../types/event-names'
import { Events } from '../types/events'
import { NormalizeRet, Position, State } from '../types/state'

export function create(defaultState?: State | undefined): State {
  const m: Emitter<Events> = mitt()

  const state: State = {
    mitt: m,
    position: { x: 0, y: 0 },
    setPosition,
    normalize,
    ...defaultState,
  }

  function normalize(): NormalizeRet {
    return {
      position: state.position,
    }
  }

  m.on(EventNames.setPosition, (event) => {
    state.position = event.position
  })

  function setPosition(position: Position): void {
    m.emit(EventNames.setPosition, { position })
  }

  return state
}
