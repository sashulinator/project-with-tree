import Link from '~/ui/link'

import Flex from '~/abstract/flex/ui/flex'
import { Route } from '~/storybook-new/routes'

interface ListItemProps {
  route: Route
}

export function ListItem(props: ListItemProps): JSX.Element {
  return (
    <li>
      <Flex mainAxis='start' crossAxis='center' gap='s'>
        <Link to={props.route.getURL()}>{props.route.getName()}</Link>
      </Flex>
    </li>
  )
}
