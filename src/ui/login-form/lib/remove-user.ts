import { User } from '../types/user'
import { getUserList } from './get-users'

export function removeUser(localStorageName: string, user: User): void {
  const userList = getUserList(localStorageName)
  const filteredUserList = userList.filter((u) => u.name !== user.name)
  localStorage.setItem(localStorageName, JSON.stringify(filteredUserList))
}
