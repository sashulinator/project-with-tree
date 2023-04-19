import { renderHook } from '@testing-library/react'

import { useControlledState } from './controlled-state'

describe(useControlledState.name, () => {
  it('take defaultValue if controlledValue=undefined', () => {
    const defState = ['def']
    const cntrlState = undefined
    const { result } = renderHook(() => useControlledState(defState, cntrlState, () => {}))
    expect(result.current[0]).toBe(defState)
    expect(result.current[0]).not.toBe(cntrlState)
  })
  it('take cntrlState if controlledValue!=undefined', () => {
    const defState = ['def']
    const cntrlState = ['cntrl']
    const { result } = renderHook(() => useControlledState(defState, cntrlState, () => {}))
    expect(result.current[0]).toBe(cntrlState)
    expect(result.current[0]).not.toBe(defState)
  })
  it('change from controlled to uncontrolled', () => {
    const defState = ['def']
    const cntrlState = ['cntrl']
    const { result, rerender } = renderHook((args) => useControlledState(...args), {
      initialProps: [defState, cntrlState, () => {}] as const,
    })
    expect(result.current[0]).toBe(cntrlState)
    rerender([defState, undefined as any, () => {}])
    expect(result.current[0]).toBe(defState)
    expect(result.current[0]).not.toBe(cntrlState)
  })
  it('change from uncontrolled to controlled', () => {
    const defState = ['def']
    const cntrlState = ['cntrl']
    const { result, rerender } = renderHook((args) => useControlledState(...args), {
      initialProps: [defState, undefined, () => {}] as const,
    })
    expect(result.current[0]).toBe(defState)
    rerender([defState, cntrlState as any, () => {}])
    expect(result.current[0]).toBe(cntrlState)
    expect(result.current[0]).not.toBe(defState)
  })
})
