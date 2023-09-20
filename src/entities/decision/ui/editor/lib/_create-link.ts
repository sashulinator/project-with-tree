import { LinkController, LinkControllerProps, LinkListController } from '../widgets/canvas'
import { _calcNextLinkIndex } from './_calc-next-link-index'

interface Context {
  linkList: LinkListController
}

/**
 * Функция обертка по созданию Линки
 *
 * @param {Context} context Контекст компонента Editor
 * @param {LinkController} props Пропсы создания LinkController
 * @returns {LinkController}
 */
export function _createLink(context: Context, props: LinkControllerProps): LinkController {
  const index = props.index || _calcNextLinkIndex(context, props.sourceId)

  return new LinkController({ ...props, index })
}
