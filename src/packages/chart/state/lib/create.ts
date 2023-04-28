import mitt, { Emitter } from 'mitt'

import { EventNames } from '../types/event-names'
import { Events } from '../types/events'
import { NormalizeRet, State, Translate } from '../types/state'

export function create(defaultState?: State | undefined): State {
  const m: Emitter<Events> = mitt()

  const chartState: State = {
    scale: 1,
    translate: { x: 0, y: 0 },
    mitt: m,
    states: {},
    normalize,
    setTranslate,
    setScale,
    ...defaultState,
  }

  function normalize(): NormalizeRet {
    return {
      scale: chartState.scale,
      translate: chartState.translate,
    }
  }
  m.on(EventNames.setScale, (event) => {
    chartState.scale = event.scale
  })
  m.on(EventNames.setTranslate, (event) => {
    chartState.translate = event.translate
  })

  function setTranslate(translate: Translate): void {
    m.emit(EventNames.setTranslate, { translate })
  }
  function setScale(scale: number): void {
    m.emit(EventNames.setScale, { scale })
  }

  return chartState
}
