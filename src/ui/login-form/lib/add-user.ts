import { User } from '../types/user'
import { getUserList } from './get-users'

export function addUser(localStorageName: string, user: User): void {
  const userList = getUserList(localStorageName)
  console.log('userList', userList)

  const filteredUserList = userList.filter((u) => u.name !== user.name)
  filteredUserList.unshift(user)
  localStorage.setItem(localStorageName, JSON.stringify(filteredUserList))
}
