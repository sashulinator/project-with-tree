import mitt, { Emitter as Mitt } from 'mitt'

import { Any } from '~/utils/core'
import { AnyEvent, EventHandlerMap, Handler, Emitter as IEmitter, WildcardHandler } from '~/utils/emitter'

export class Emitter<E extends AnyEvent> implements IEmitter<E> {
  private _emitter: Any

  constructor() {
    this._emitter = mitt()
  }

  get all(): EventHandlerMap<E> {
    return (this._emitter as Mitt<E>).all
  }
  on<Key extends keyof E>(type: Key, handler: Handler<E[Key]>): void {
    ;(this._emitter as Mitt<E>).on(type, handler)
  }

  off<Key extends keyof E>(type: Key, handler?: Handler<E[Key]> | undefined): void {
    ;(this._emitter as Mitt<E>).off(type, handler)
  }

  emit<Key extends keyof E>(type: Key, event: E[Key]): void {
    ;(this._emitter as Mitt<E>).emit(type, event)
  }

  offAll(handler: WildcardHandler<E>): void {
    ;(this._emitter as Mitt<E>).off('*', handler)
  }

  onAll(handler: WildcardHandler<E>): void {
    ;(this._emitter as Mitt<E>).on('*', handler)
  }
}
