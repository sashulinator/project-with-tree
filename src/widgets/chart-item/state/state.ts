import { Link } from '~/entities/point'
import { Id } from '~/utils/core'
import { EmittableState } from '~/utils/emittable-state'

import { Position } from '../types/position'
import { EventNames } from './event-names'
import { Events } from './events'

export interface StateProps {
  id: Id
  position: Position
  width?: number
  height?: number
  links?: Link[]
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
    this.mitt.on(EventNames.setPosition, (event) => {
      this.position = event.position
    })
    this.mitt.on(EventNames.setWidth, (event) => {
      this.width = event.width
    })
    this.mitt.on(EventNames.setHeight, (event) => {
      this.height = event.height
    })
    this.mitt.on(EventNames.setRef, (event) => {
      this.ref.current = event.element
    })
    this.mitt.on(EventNames.addLink, (event) => {
      this.links = [...this.links, event.link]
    })
  }

  setPosition = (position: Position): void => {
    this.mitt.emit(EventNames.setPosition, { position })
  }

  setWidth = (width: number): void => {
    this.mitt.emit(EventNames.setWidth, { width })
  }

  setHeight = (height: number): void => {
    this.mitt.emit(EventNames.setHeight, { height })
  }

  setRef = (element: HTMLElement): void => {
    if (element === this.ref.current) return
    this.mitt.emit(EventNames.setRef, { element })
  }

  addLink = (link: Link): void => {
    this.mitt.emit(EventNames.addLink, { link })
  }
}
