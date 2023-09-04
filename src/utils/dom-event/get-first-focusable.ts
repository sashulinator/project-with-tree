export function getFirstFocusable(htmlElement: HTMLElement): HTMLElement | null {
  const possible = [
    'a[href]',
    'area[href]',
    'input:not([disabled])',
    'select:not([disabled])',
    'textarea:not([disabled])',
    'button:not([disabled])',
    '[tabindex="0"]',
  ]
  return htmlElement.querySelector(possible.join(', '))
}
