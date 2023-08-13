import { has } from '~/utils/core'

import { User } from '../types/user'

export function getUserList(localStorageName: string): User[] {
  const string = localStorage.getItem(localStorageName) || ''
  try {
    const userList = JSON.parse(string) as unknown

    if (!Array.isArray(userList)) throw Error()

    userList.forEach((item) => {
      if (!has(item, 'name') || !item.name) throw Error()
    })

    return userList as User[]
  } catch (e) {
    localStorage.removeItem(localStorageName)
    return []
  }
}
