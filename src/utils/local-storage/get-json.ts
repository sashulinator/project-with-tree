export function getJSON<T>(name: string, validator?: (json: T) => void): null | T {
  const string = localStorage.getItem(name)

  if (string === null) return null

  try {
    const json = JSON.parse(string)
    validator?.(json)
    return json
  } catch (e) {
    localStorage.removeItem(name)
    return null
  }
}
