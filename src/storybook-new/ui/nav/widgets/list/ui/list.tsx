import Flex from '~/abstract/flex'

import { ChevronAccordion } from '~/ui/accordion'
import Link from '~/ui/link'
import { ListItem } from '../../list-item/ui/list-item'
import { Route } from '~/storybook-new/routes'

interface ListProps {
  routes: Record<string, Route>
  defaultExpanded?: boolean | undefined
}

export function List(props: ListProps): JSX.Element {
  return (
    <Flex gap='m' dir='column' width='100%'>
      {Object.entries(props.routes).map(([key, route]: [string, Route]) => {
        if (route.children) {
          return (
            <ChevronAccordion
              key={key}
              defaultExpanded={props.defaultExpanded}
              height={'s'}
              header={
                <Flex width='100%'>
                  <Link to={route.getURL()}>{route.getName()}</Link>
                </Flex>
              }
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
