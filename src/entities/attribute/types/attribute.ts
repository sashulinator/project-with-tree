import { Id } from '~/utils/core'

export type ValueType = 'NUMBER' | 'TEXT' | 'BOOLEAN' | 'DATETIME'

export interface Attribute {
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
  keyname: string

  /**
   * Описание
   */
  domainId: Id

  /**
   * Тип
   */
  valueType: ValueType

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
}
