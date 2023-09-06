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
   * Описание
   */
  description: string

  /**
   * Тип
   */
  type: string

  /**
   * Cистемное название
   */
  keyName: string

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
  updatedBy: string
}
