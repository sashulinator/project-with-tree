import { Id } from '~/utils/core'

import { LinkListController } from '../widgets/canvas'

interface Context {
  linkList: LinkListController
}

/**
 * Вычисляет индекс для нового Ruleset
 *
 * @param {Context} context Контекст компонента Editor
 * @param {Id | undefined} sourceId Id ноды от которой рисуется Link
 * @returns {number} Индекс
 */
export function _calcNextRulesetIndex(context: Context, sourceId: Id | undefined): number {
  if (sourceId === undefined) return 0

  const { linkList } = context

  return linkList.getLinksBySourceId(sourceId).length
}
