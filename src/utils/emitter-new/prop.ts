import { Listener } from './types/listener'

export class Prop<const TName, TValue, Args extends unknown[] = never> {
  private _value: TValue

  name: TName

  onChange: ((prop: this, ...args: Args) => void) | undefined

  listeners: Listener<this>[]

  constructor(name: TName, value: TValue) {
    this._value = value

    this.name = name

    this.listeners = []
  }

  get value(): TValue {
    return this._value
  }

  set = (value: TValue, ...args: Args) => {
    this._value = value
    this.onChange?.(this, ...args)
  }

  on = (listener: Listener<this>): this => {
    this.listeners?.push(listener)
    return this
  }
}
