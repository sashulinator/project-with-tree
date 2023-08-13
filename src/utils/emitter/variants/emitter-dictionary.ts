import { Emitter } from '..'
import { Any } from '../../core'
import { Dictionary } from './dictionary'

type Events<TEmitter> = {
  add: { item: TEmitter }
  update: { item: TEmitter }
  remove: { item: TEmitter }
}

/**
 * Позволяет производить CRUD операции и подписывает `emitter` на все события `emitter`a элемента
 */
export class EmitterDictionary<
  TEmitter extends Emitter<Any>,
  TEvents extends Events<TEmitter> = Events<TEmitter>,
> extends Dictionary<TEmitter, TEvents> {
  constructor(emitterList: TEmitter[], getKey: (s: TEmitter) => string) {
    super(emitterList, getKey)

    this.subscribeToEmitters(emitterList)

    this.subscribeToDictionary()
  }

  private subscribeToEmitters(emitterList: TEmitter[]): void {
    for (let index = 0; index < emitterList.length; index++) {
      const emitter = emitterList[index]
      emitter.on('*', (eventName, ev) => {
        this.emit(eventName as keyof TEvents, { item: emitter, ...ev })
      })
    }
  }

  private subscribeToDictionary(): void {
    this.on('add', (event: Events<TEmitter>['add']) => {
      this.subscribeToEmitters([event.item])
    })
    this.on('update', (event: Events<TEmitter>['update']) => {
      this.subscribeToEmitters([event.item])
    })
    this.on('remove', (event: Events<TEmitter>['remove']) => {
      event.item.off('*')
    })
  }
}
