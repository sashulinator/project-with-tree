import React from 'react'
import { Route, Routes } from 'react-router-dom'

import { routes } from './routes'
import Section from './ui/section'

export default function StorybookPage(): JSX.Element {
  const routeList = Object.values(routes)

  return (
    <main className='StorybookPage'>
      <Routes>
        {routeList.map((route) => {
          return (
            <React.Fragment key={route.path}>
              <Route key={route.path} path={route.path} element={route.element} />
              {route.children &&
                Object.values(route.children).map((route) => {
                  if (route.children) {
                    return (
                      <React.Fragment key={route.path}>
                        <Route
                          key={route.path}
                          path={route.path}
                          element={
                            <Section
                              description={route.config.description}
                              extends={route.config.extends}
                              features={route.config.features}
                              h1={route.getName()}
                            >
                              {route.element}
                            </Section>
                          }
                        />
                        {route.children &&
                          Object.values(route.children).map((route) => {
                            return (
                              <Route
                                key={route.path}
                                path={route.path}
                                element={
                                  <Section
                                    description={route.config.description}
                                    extends={route.config.extends}
                                    features={route.config.features}
                                    h1={route.getName()}
                                  >
                                    {route.element}
                                  </Section>
                                }
                              />
                            )
                          })}
                      </React.Fragment>
                    )
                  }
                  return (
                    <Route
                      key={route.path}
                      path={route.path}
                      element={
                        <Section
                          description={route.config.description}
                          extends={route.config.extends}
                          features={route.config.features}
                          h1={route.getName()}
                        >
                          {route.element}
                        </Section>
                      }
                    />
                  )
                })}
            </React.Fragment>
          )
        })}
      </Routes>
    </main>
  )
}
