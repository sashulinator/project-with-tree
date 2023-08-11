/**
 * Полезно когда слушаем в каком-то компоненте клавиши Ctrl+Z,
 * но у этого компонента внутри есть inputы в которых пользователь
 * так же может применить эти сочетания клавиш
 */
export function isActiveInput() {
  return (
    document.activeElement?.tagName.toUpperCase() === 'INPUT' && (document.activeElement as any)?.type !== 'checkbox'
  )
}
