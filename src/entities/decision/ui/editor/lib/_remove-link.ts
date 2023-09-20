import { Id } from '~/utils/core'

import { LinkListController } from '../widgets/canvas'

interface Context {
  linkList: LinkListController
}

export function _removeLink(context: Context, id: Id): void {
  const { linkList } = context

  const linkToRemove = linkList.get(id)

  linkList.remove(id)

  if (linkToRemove.sourceId.value === undefined) return

  const links = linkList.getBySourceId(linkToRemove.sourceId.value)
  const sortedLinks = links.sort((a, b) => a.index.value - b.index.value)

  sortedLinks.forEach((link, i) => link.index.set(i))
}
