import { getThemeColor } from './get-theme-color'
import { getThemeColorMeta } from './get-theme-color-meta'
import colorTransition from 'color-transitions'
import { useEffect, useMemo, useRef } from 'react'

export function useColorifyBrowser(to: string, fromArg?: string) {
  const from = useMemo(() => fromArg || getThemeColor(), [fromArg])
  const colors = useRef<Record<'current' | 'previous', Record<'from' | 'to', string>>>({
    current: { from, to },
    previous: { from, to },
  })
  colors.current = useMemo(() => ({ current: { from, to }, previous: colors.current.current }), [from, to])

  useEffect(() => {
    const meta = getThemeColorMeta()
    colorTransition(from, to, { duration: 100 }, (newColor) => {
      meta.content = `rgb(${newColor[0] as number}, ${newColor[1] as number}, ${newColor[2] as number})`
      return colors.current.current.from === from && colors.current.current.to === to
    })
    document.querySelector('head')?.appendChild(meta)
    return () => {
      if (colors.current.current.from === from && colors.current.current.to === to) {
        colorTransition(to, from, { duration: 100 }, (newColor) => {
          meta.content = `rgb(${newColor[0] as number}, ${newColor[1] as number}, ${newColor[2] as number})`
        })
      }
    }
  }, [from, to])
}
