import mitt, { Emitter as Mitt } from 'mitt'

import { AnyEvent, Handler, Emitter as IEmitter, WildcardHandler } from '~/utils/emitterable'

export class Emitter<E extends AnyEvent> implements IEmitter<E> {
  protected _emitter: Mitt<E>

  constructor() {
    this._emitter = mitt()
  }

  on<Key extends keyof E>(type: Key, handler: Handler<E[Key]>): void {
    this._emitter.on(type, handler)
  }

  off<Key extends keyof E>(type: Key, handler?: Handler<E[Key]> | undefined): void {
    this._emitter.off(type, handler)
  }

  emit<Key extends keyof E>(type: Key, event: E[Key]): void {
    this._emitter.emit(type, event)
  }

  offAll(handler: WildcardHandler<E>): void {
    this._emitter.off('*', handler)
  }

  onAll(handler: WildcardHandler<E>): void {
    this._emitter.on('*', handler)
  }
}
