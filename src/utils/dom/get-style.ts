export function getStyle(element: Element | null): null | CSSStyleDeclaration {
  if (element) {
    return getComputedStyle(element)
  }
  return null
}
