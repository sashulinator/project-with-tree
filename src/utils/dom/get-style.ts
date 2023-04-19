export function getStyle(element: HTMLElement | null): null | CSSStyleDeclaration {
  if (element) {
    return getComputedStyle(element)
  }
  return null
}
