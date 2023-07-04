import './reset.css'

import './app.css'
import './measures.css'
import './utils.css'
// 🟢 Отключаем eslint т.к. этот файл генерируется динамически
// eslint-disable-next-line import/no-unresolved
import 'uno.css'

import { Suspense } from 'react'
import { createPortal } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { BrowserRouter } from 'react-router-dom'

import { THEME as ThemelocalStarageName } from '~/constants/local-storage'
import { DEFAULT_THEME } from '~/constants/theme'
import { getCurrentThemeName } from '~/lib/theme'
import { onAddTheme } from '~/lib/theme/on-add-theme'
import '~/shared/dayjs'
import { emitter } from '~/shared/emitter'
import { queryClient } from '~/shared/react-query'
import { COMMON } from '~/shared/theme/common'
import { DARK } from '~/shared/theme/dark'
import { themes as depricatedThemes } from '~/shared/theme/depricated-themes'
import { LIGHT } from '~/shared/theme/light'
import { themes } from '~/shared/theme/themes'
import { Container } from '~/ui/toast'
import { useOnMount } from '~/utils/hooks'
import { setTheme } from '~/utils/theme'

import Layout from './layout'

emitter.on('addTheme', onAddTheme)

export default function App(): JSX.Element {
  useOnMount(() => emitter.emit('addTheme', { dark: { ...DARK, ...COMMON }, light: { ...LIGHT, ...COMMON } }))
  // TODO remove depricated
  useOnMount(() => emitter.emit('addTheme', depricatedThemes))
  useOnMount(() => setTheme(getCurrentThemeName(), DEFAULT_THEME, { ...themes }, ThemelocalStarageName))

  // prettier-ignore
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Layout />
        </BrowserRouter>
        {createPortal([
          <ReactQueryDevtools key='0' />,
          <Container key='1' />,
        ], document.body)}
      </QueryClientProvider>
    </Suspense>
  )
}
