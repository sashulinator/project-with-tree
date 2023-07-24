import { Route } from '~/pages/storybook/shared/routes'
import Link from '~/ui/link'

interface ListItemProps {
  route: Route
}

export function ListItem(props: ListItemProps): JSX.Element {
  return (
    <li>
      <Link to={props.route.getURL()}>{props.route.getName()}</Link>
    </li>
  )
}
