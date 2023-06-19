interface Propagatable {
  stopPropagation: () => void
}

/**
 * @example
 * fns(stopPropagation, doSmth1, doSmth2)
 */
export function stopPropagation(e: Propagatable) {
  e.stopPropagation()
}
