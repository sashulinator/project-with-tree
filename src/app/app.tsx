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
import { RecoilRoot } from 'recoil'
import '~/shared/dayjs'
import { emitter } from '~/shared/emitter'
import { queryClient } from '~/shared/react-query'
import { DARK as dark } from '~/shared/theme/dark'
import { LIGHT as light } from '~/shared/theme/light'
import { Container } from '~/ui/toast'

import Layout from './layout'
import DocumentTitle from './document-title'

emitter.emit('addTheme', { dark, light })

export default function App(): JSX.Element {
  // prettier-ignore
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <DocumentTitle/>
          <Layout />
        </BrowserRouter>
        {createPortal([
          <ReactQueryDevtools key='0' />,
          <Container key='1' />,
        ], document.body)}
      </RecoilRoot>
        
      </QueryClientProvider>
    </Suspense>
  )
}
