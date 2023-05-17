import { Link } from '~/entities/point'
import { Id } from '~/utils/core'
import { EmittableState } from '~/utils/emittable-state'

import { Position } from '../types/position'
import { EventNames } from './event-names'
import { Events } from './events'

export interface StateProps {
  id: Id
  position: Position
  width?: number | undefined
  height?: number | undefined
  links?: Link[] | undefined
}

export class State<D> extends EmittableState<Events> {
  id: Id

  position: Position

  height: number

  width: number

  data: D

  ref: { current: null | HTMLElement }

  links: Link[]

  constructor(data: D, props: StateProps) {
    super()
    this.data = data
    this.subscribe()

    this.id = props.id
    this.position = props.position
    this.height = props.width || 0
    this.width = props.height || 0
    this.ref = { current: null }
    this.links = props.links || []
  }

  private subscribe = (): void => {
    this.emitter.on(EventNames.setPosition, (event) => {
      this.position = event.position
    })
    this.emitter.on(EventNames.setWidth, (event) => {
      this.width = event.width
    })
    this.emitter.on(EventNames.setHeight, (event) => {
      this.height = event.height
    })
    this.emitter.on(EventNames.setRef, (event) => {
      this.ref.current = event.element
    })
    this.emitter.on(EventNames.addLink, (event) => {
      this.links = [...this.links, event.link]
    })
  }

  setPosition = (position: Position): void => {
    this.emitter.emit(EventNames.setPosition, { position })
  }

  setWidth = (width: number): void => {
    this.emitter.emit(EventNames.setWidth, { width })
  }

  setHeight = (height: number): void => {
    this.emitter.emit(EventNames.setHeight, { height })
  }

  setRef = (element: HTMLElement): void => {
    if (element === this.ref.current) return
    this.emitter.emit(EventNames.setRef, { element })
  }

  addLink = (link: Link): void => {
    this.emitter.emit(EventNames.addLink, { link })
  }
}
