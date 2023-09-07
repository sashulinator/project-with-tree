import { useEffect } from 'react'
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom'

import { getCurrent as getCurrentRoute } from '~/lib/route'
import { emitter } from '~/shared/emitter'
import { routes } from '~/shared/routes'

ProtectedRoutes.displayName = 'app-Routes'

export interface Props {
  className?: string
  renderLayout: (props: { children: React.ReactNode }) => JSX.Element | null
}

// Пока еще не протектед но скоро будут
export default function ProtectedRoutes(props: Props): JSX.Element {
  const Layout = props.renderLayout

  return (
    <BrowserRouter>
      <ListenLocationChange />
      <Layout>
        <Routes>
          {Object.entries(routes).map(([key, route]) => (
            <Route key={key} {...route} />
          ))}
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

/**
 * Private
 */
const ListenLocationChange = (): null => {
  const location = useLocation()
  useEffect(() => emitter.emit('locationChanged', location), [location])
  useEffect(() => emitter.emit('routeChanged', getCurrentRoute(location)), [location])
  return null
}
