/* eslint-disable eslint-comments/disable-enable-pair, react-hooks/rules-of-hooks */
import './reset.css'

import './app.css'
import './measures.css'
import './utils.css'

import { Suspense } from 'react'
import { createPortal } from 'react-dom'
import { QueryClientProvider } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { RecoilRoot } from 'recoil'

import '~/shared/dayjs'
import { queryClient } from '~/shared/react-query'
import { Container } from '~/ui/toast'

import Layout from './layout'
import ProtectedRoutes from './protected-routes'

export default function App(): JSX.Element {
  // prettier-ignore
  return (
    <Suspense>
      <QueryClientProvider client={queryClient}>
        <RecoilRoot>
          <ProtectedRoutes renderLayout={Layout}/>
          {createPortal([
            <ReactQueryDevtools key='0' />,
            <Container key='1' />,
          ], document.body)}
        </RecoilRoot>

      </QueryClientProvider>
    </Suspense>
  )
}
