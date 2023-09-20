import { LinkController, LinkListController } from '../widgets/canvas'

interface Context {
  linkList: LinkListController
}

export function _addLink(context: Context, link: LinkController): void {
  const { linkList } = context

  linkList.add(link)
}
