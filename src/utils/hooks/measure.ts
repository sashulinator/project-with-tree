import { useEffect, useState } from 'react'
import { getStyle, observeResize } from '../dom'
import { Size } from '../dom/types/size'
import { useForceUpdate } from './force-update'

export function useMeasure(): [(ref: Element) => void, Size] {
  const [measureRef, setMeasureRef] = useState<Element | null>(null)
  const update = useForceUpdate()
  const styles = getStyle(measureRef)
  const height = parseInt(styles?.height || '', 10) || 0
  const width = parseInt(styles?.width || '', 10) || 0

  useEffect(() => observeResize(measureRef, update), [measureRef])

  return [setMeasureRef, { height, width }]
}
