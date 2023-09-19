import { Id } from '~/utils/core'

import { LinkListController } from '../widgets/canvas'

interface Context {
  linkList: LinkListController
}

export function _removeLink(context: Context, id: Id): void {
  const { linkList } = context

  linkList.remove(id)
}
