import React from 'react'
import Flex from '~/abstract/flex'
import { Route } from '~/pages/storybook/shared/routes'
import { ChevronAccordion } from '~/ui/accordion'
import Link from '~/ui/link'
import { ListItem } from '../../list-item/ui/list-item'

interface ListProps {
  routes: Record<string, Route>
  defaultExpanded?: boolean | undefined
}

export function List(props: ListProps): JSX.Element {
  return (
    <Flex gap='m' dir='column'>
      {Object.entries(props.routes).map(([key, route]: [string, Route]) => {
        if (route.children) {
          return (
            <ChevronAccordion
              key={key}
              defaultExpanded={props.defaultExpanded}
              height={'s'}
              header={<Link to={route.getURL()}>{route.getName()}</Link>}
            >
              <Flex padding='0.5rem 0.1rem 0.5rem 1rem ' dir='column' gap='m'>
                {Object.entries(route.children).map(([key, route]) => {
                  if (route.children) {
                    return <List key={key} routes={{ t: route }} defaultExpanded={true} />
                  }
                  return <ListItem key={key} route={route} />
                })}
              </Flex>
            </ChevronAccordion>
          )
        } else {
          return <ListItem key={key} route={route} />
        }
      })}
    </Flex>
  )
}
