import './main.scss'

import { useMemo } from 'react'

import { routes } from '~/shared/routes'
import Link from '~/ui/link'
import OrderedList from '~/ui/ordered-list'
import { getJSON } from '~/utils/local-storage'

// import Dropdown from '~/ui/dropdown'
// import Popover from '~/ui/popover'
// import TextInput from '~/ui/text-input'
// import { useBoolean } from '~/utils/hooks'
// import { ThemeDropdown } from '~/widgets/theme'

export default function MainPage(): JSX.Element {
  const items = [
    <Link key={0} to={routes.decisionList.getURL()}>
      Деревья
    </Link>,
    <Link key={1} to={routes.domainList.getURL()}>
      Домены
    </Link>,
    <Link key={2} to={routes.decisionList.getURL()}>
      Атрибуты
    </Link>,
    <Link key={3} to={routes.ruleList.getURL()}>
      Старые Правила
    </Link>,
    <Link key={4} to={routes.decisionList.getURL()}>
      Системы источники
    </Link>,
    <Link key={5} to={routes.decisionList.getURL()}>
      Админ
    </Link>,
    <Link key={6} to={routes.ruleTestList.getURL()}>
      Новые Правила
    </Link>,
  ]

  const order = getJSON<number[]>('mainListOrder')

  const orderMap: number[] = []
  const orderedItems = useMemo(() => {
    return (order?.length === items.length ? order : [0, 1, 2, 3, 4, 5, 6]).map((index) => {
      orderMap.push(index)
      return items[index] as React.ReactNode
    })
  }, [])

  return (
    <main className='page-Main pt-5rem flex flex-col'>
      <OrderedList
        className='list'
        items={orderedItems}
        onChange={(newOrder): void => {
          const origOrder = newOrder.map((i) => orderMap[i])
          localStorage.setItem('mainListOrder', JSON.stringify(origOrder))
        }}
      />
    </main>
  )
}
