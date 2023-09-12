import { EditorValues } from '../models/editorRulesValues'

interface Response {
  name: string
  keyName: string
  frontValue: EditorValues[]
  userId: string
}

export function getReqForCreateRule(editorValue: EditorValues[], name: string, keyName: string): Response {
  const result = {
    name: name.trim(),
    keyName: keyName.trim(),
    frontValue: editorValue,
    userId: 'user@mail.ru',
  }
  return result
}
