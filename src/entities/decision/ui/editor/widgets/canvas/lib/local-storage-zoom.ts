import { assertInteger } from '~/utils/assertions/integer'
import { getJSON } from '~/utils/local-storage'

export const LOCAL_STORAGE_ZOOM = 'dicision_editor_zoom'

export type LocalStorageZoom = { k: number; x: number; y: number }

function getIdFromLocation(): string | undefined {
  const parts = location.pathname.split('/')
  return parts.at(-1)
}

export function getLocalStorageZoom(): LocalStorageZoom | null {
  const id = getIdFromLocation()

  if (!id) return null
  const json = getJSON<LocalStorageZoom>(`${LOCAL_STORAGE_ZOOM}_${id}`, (json) => {
    assertInteger(json.k)
    assertInteger(json.x)
    assertInteger(json.y)
  })

  return json
}

export function setZoomLocalStorage(zoom: LocalStorageZoom): void {
  const id = getIdFromLocation()
  if (!id) return
  localStorage.setItem(`${LOCAL_STORAGE_ZOOM}_${id}`, JSON.stringify(zoom))
}
