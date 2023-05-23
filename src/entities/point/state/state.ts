import mitt, { Emitter } from 'mitt'

import { Link, Point } from '~/entities/point'
import { Id } from '~/utils/core'
import { Emitterable } from '~/utils/emitterable'
import { Position } from '~/widgets/chart-item'

import { EventNames } from './event-names'
import { Events } from './events'

export interface StateProps {
  id: Id
  position: Position
  width?: number | undefined
  height?: number | undefined
  links?: Link[] | undefined
}

export class PointState implements Emitterable<Events> {
  emitter: Emitter<Events>

  id: Id

  position: Position

  height: number

  width: number

  point: Point

  ref: { current: null | HTMLElement }

  links: Link[]

  constructor(point: Point, props: StateProps) {
    this.emitter = mitt()
    this.point = point
    this.subscribe()

    this.id = props.id
    this.position = props.position
    this.height = props.width || 0
    this.width = props.height || 0
    this.ref = { current: null }
    this.links = props.links || []
  }

  private subscribe = (): void => {
    this.emitter.on('setPosition', (event) => {
      this.position = event.position
    })
    this.emitter.on('setWidth', (event) => {
      this.width = event.width
    })
    this.emitter.on('setHeight', (event) => {
      this.height = event.height
    })
    this.emitter.on('setRef', (event) => {
      this.ref.current = event.element
    })
    this.emitter.on('addLink', (event) => {
      this.links = [...this.links, event.link]
    })
  }

  setPosition = (position: Position): void => {
    this.emitter.emit('setPosition', { position })
  }

  setWidth = (width: number): void => {
    this.emitter.emit('setWidth', { width })
  }

  setHeight = (height: number): void => {
    this.emitter.emit('setHeight', { height })
  }

  setRef = (element: HTMLElement): void => {
    if (element === this.ref.current) return
    this.emitter.emit('setRef', { element })
  }

  addLink = (link: Link): void => {
    this.emitter.emit('addLink', { link })
  }
}
