export default function getRootElement(): HTMLElement {
  const rootElement = document.getElementById('root')

  if (rootElement === null) {
    throw new Error('Root Element is absent in index.html')
  }

  return rootElement
}
