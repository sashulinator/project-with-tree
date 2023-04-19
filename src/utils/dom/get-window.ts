export function getWindow(ele: HTMLElement): Window {
  const window = ele.ownerDocument.defaultView

  if (!window) {
    throw new Error('Cannot get Window')
  }

  return ele.ownerDocument.defaultView
}
