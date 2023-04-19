export function getThemeColorMeta(): HTMLMetaElement {
  const meta = document.querySelector<HTMLMetaElement>('head [name="theme-color"]')
  if (meta === null) {
    throw new Error('ThemeColor does not exist')
  }
  return meta
}
