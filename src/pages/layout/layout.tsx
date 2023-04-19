import './layout.css'

import { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import { useFetchLayout } from '~/api/layout/fetch'
import { Layout, LayoutState, createLayoutState } from '~/entities/layout'
import { initLayout } from '~/entities/layout/lib/init-layout'

import Preview from './ui/preview'
import PropsPanel from './ui/props-panel'
import TreePanel from './ui/tree-panel'

export default function LayoutPage(): JSX.Element {
  const { id } = useParams()
  const isCreate = id === 'create'

  const fetcher = useFetchLayout({ staleTime: Infinity }, { id })
  const initedLayout: Layout = useMemo(initLayout, [])
  const layout: Layout | undefined = isCreate ? initedLayout : fetcher.data

  const layoutState: LayoutState | null = useMemo(() => createLayoutState(layout), [layout])

  if (!isCreate && !fetcher.isSuccess) {
    return <>Fail</>
  }

  if (layoutState === null) {
    return <>Empty </>
  }

  return (
    <main className='LayoutPage'>
      <TreePanel layoutState={layoutState} />
      <Preview layoutState={layoutState} />
      <PropsPanel layout={layout} />
    </main>
  )
}
