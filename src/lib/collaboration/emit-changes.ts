type Box<D> = {
  type: string
  data: D
  username: string
}

export function emitChanges<T>(name: string, data: Box<T>): void {
  localStorage.setItem(name, JSON.stringify(data))
}
