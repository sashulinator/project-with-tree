import { EditorValues } from '~/entities/rule/models/editorRulesValues'

export interface RequestData {
  name: string
  keyName: string
  frontValue: EditorValues[]
  userId: string
}
