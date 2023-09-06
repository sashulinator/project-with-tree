import { Id } from '~/utils/core'

export type Type = 'UNKNOWN1' | 'UNKNOWN2'

export interface Domain {
  /**
   * Идентификатор
   */
  id: Id

  /**
   * Версия
   */
  rev: string

  /**
   * Имя
   */
  name: string

  /**
   * Cистемное название
   */
  keyName: string

  /**
   * Описание
   */
  description: string

  /**
   * Тип
   */
  type: Type

  /**
   * Родительский домен
   */
  parentId: Id

  /**
   * Cистема источник
   */
  sourceSystemId: Id

  /**
   * Дата создания
   */
  createDttm: string

  /**
   * Дата обновления
   */
  updateDttm: string

  /**
   * Кем создано
   */
  createdBy: string

  /**
   * Кем обновлено
   */
  updatesBy: string

  userId: Id
}
