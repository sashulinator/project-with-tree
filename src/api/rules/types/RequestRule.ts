import { EditorValues } from '~/entities/rules/models/editorRulesValues'

export interface RequestData {
  name: string
  keyName: string
  frontValue: EditorValues[]
  userId: string
}
