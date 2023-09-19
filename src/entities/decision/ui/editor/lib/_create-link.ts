import { LinkController, LinkControllerProps } from '../widgets/canvas'

interface Context {}

export function _createLink(context: Context, props: LinkControllerProps): LinkController {
  const {} = context

  // TODO вычислить index
  return new LinkController(props)
}
