import { Route } from '~/pages/storybook/shared/routes'
import Link from '~/ui/link'
import Chips from '../../chips/ui/chips'
import Flex from '~/abstract/flex/ui/flex'

interface ListItemProps {
  route: Route
}

export function ListItem(props: ListItemProps): JSX.Element {
  return (
    <li>
      <Flex mainAxis='start' crossAxis='center' gap='s'>
        <Link to={props.route.getURL()}>{props.route.getName()}</Link>
        <Chips route={props.route} />
      </Flex>
    </li>
  )
}
