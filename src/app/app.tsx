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
import { queryClient } from '~/shared/react-query'
import { themes } from '~/shared/theme/themes'
import { Container } from '~/ui/toast'
import { setTheme } from '~/utils/theme'

import '../shared/dayjs'
import Layout from './layout'

export default function App(): JSX.Element {
  setTheme(getCurrentThemeName(), DEFAULT_THEME, themes, ThemelocalStarageName)

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
