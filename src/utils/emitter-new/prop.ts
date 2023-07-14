export class Prop<TValue, Args extends unknown[] = never> {
  private _value: TValue

  name: string

  onChange: (value: TValue, ...args: Args) => void

  constructor(value: TValue, name: string, onChange: (value: TValue, ...args: Args) => void) {
    this._value = value

    this.name = name

    this.onChange = onChange
  }

  get value(): TValue {
    return this._value
  }

  set = (value: TValue, ...args: Args) => {
    this._value = value
    this.onChange(value, ...args)
  }
}
