export function getCSSVar(name: string, element = document.documentElement) {
  return window.getComputedStyle(element).getPropertyValue(`--${name}`)
}

export function setCSSVar(name: string, value: string | number, element = document.documentElement) {
  element.style.setProperty(`--${name}`, value.toString())
}

export function removeCSSVar(name: string, element = document.documentElement) {
  element.style.removeProperty(`--${name}`)
}

export const setCSSVars = (theme: Record<string, string | number>): void => {
  Object.entries(theme).forEach(([key, value]) => setCSSVar(key, value))
}

export const removeCSSVars = (theme: Record<string, string | number>): void => {
  Object.keys(theme).forEach((key) => removeCSSVar(key))
}
