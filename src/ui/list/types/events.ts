import { EventNames } from './event-names'
import { Key } from './key'

export type Events = {
  [EventNames.setSelected]: Key[]
  [EventNames.selectOne]: Key
  [EventNames.unselectOne]: Key

  [EventNames.setChecked]: Key[]
  [EventNames.checkOne]: Key
  [EventNames.uncheckOne]: Key

  [EventNames.focus]: Key | void
  [EventNames.unfocus]: void
}
