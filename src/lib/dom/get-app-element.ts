export default function getAppElement(): HTMLElement {
  const rootElement = document.getElementById('app')

  if (rootElement === null) {
    throw new Error('App Element is absent in DOM')
  }

  return rootElement
}
