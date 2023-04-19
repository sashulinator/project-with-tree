/**
 * Проблематика:
 * 1. Проверка на сеществование Елемента перед тем как установить новое значение
 * 2. Однотипные длинные строки кода при установке множества стилей
 * @param element HTMLElement
 * @param styles Стили
 * @returns
 */
export function setStyles(
  element: HTMLElement | null | undefined,
  styles: Record<string, string | number | undefined>
): void {
  if (!element) {
    return
  }

  const entries = Object.entries(styles)

  for (let i = 0; i < entries.length; i++) {
    const [key, value] = entries[i]
    element.style[key] = value
  }
}
