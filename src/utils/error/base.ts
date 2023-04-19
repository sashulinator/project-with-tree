export class BaseError extends Error {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  constructor(message: string, props?: Record<string, any>) {
    super(message)

    if (props) {
      Object.assign(this, props)
    }

    Object.setPrototypeOf(this, BaseError.prototype)
  }
}
