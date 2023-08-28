import { EditorValues } from '../models/editorRulesValues'

interface Response {
  name: string
  keyName: string
  frontValue: string
  editor: string
  userId: string
}

export function getReqForCreateRule(editorValue: EditorValues[], title: string): Response {
  let frontValue = ''
  editorValue.forEach((arr, index, editor) => {
    arr.valueArr.forEach((item, i, valueArr) => {
      if (valueArr.length > 1) {
        if (i === 0) {
          frontValue += `(${item.value} ${item.condition} `
        } else if (i === valueArr.length - 1) {
          if (index !== editor.length - 1) {
            frontValue += `${item.value}) ${arr.condition} `
          } else {
            frontValue += `${item.value})`
          }
        } else {
          frontValue += `${item.value} ${item.condition} `
        }
      } else if (index !== editor.length - 1) {
        frontValue += `${item.value} ${arr.condition} `
      } else {
        frontValue += item.value
      }
    })
  })
  let name = ''
  let keyName = ''
  let flag = false

  title.split('').forEach((item) => {
    if (item === '(') {
      flag = true
    }
    if (!flag) {
      name += item
    } else if (!/[()]/.test(item)) {
      keyName += item
    }
  })
  const result = {
    name: name.trim(),
    keyName: keyName.trim(),
    frontValue: `(${frontValue})`,
    editor: JSON.stringify(editorValue),
    userId: 'user@mail.ru',
  }
  return result
}
