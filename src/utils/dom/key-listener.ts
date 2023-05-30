interface Conf {
  ctrlKey?: boolean
  metaKey?: boolean
  shiftKey?: boolean
  altKey?: boolean
}

interface Event extends Conf {
  key: string
}

export function keyListener<E extends Event>(key: string, cb: (e: E) => void, conf?: Conf) {
  return (e: E) => {
    if (e.key !== key) return
    if (conf?.ctrlKey && !e.ctrlKey) return
    if (conf?.metaKey && !e.metaKey) return
    if (conf?.shiftKey && !e.shiftKey) return
    if (conf?.altKey && !e.altKey) return

    cb(e)
  }
}
