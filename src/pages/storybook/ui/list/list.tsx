// import List, { top } from '~/ui/List'
import { useMemo, useState } from 'react'

import { User, groupedUserList, userList } from '~/mocks/deprecated/user-list'
import { EventNames, ItemProps } from '~/ui/list'
import ControlledList, { ControllableItemProps } from '~/ui/list/ui/controlled-list'

export default function ListPage(): JSX.Element {
  const [singleChecked, setSingleChecked] = useState<(string | number)[]>([])
  const [singleSelected, setSingleSelected] = useState<(string | number)[]>([])
  const [multiChecked, setMultiChecked] = useState<(string | number)[]>([])
  const [multiSelected, setMultiSelected] = useState<(string | number)[]>([])
  const [groupedSelected, setGroupedSelected] = useState<(string | number)[]>([])
  const [groupedChecked, setGroupedChecked] = useState<(string | number)[]>([])

  const [searchQuery, setSearchQuery] = useState('')

  const filteredUserList = useMemo(
    () =>
      userList.filter((u) => {
        return new RegExp(searchQuery, 'gi').test(u.username)
      }),
    [searchQuery]
  )
  const filteredGroupedUserList = useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => groupedUserList.filter((u) => new RegExp(searchQuery, 'gi').test((u as any).username)),
    [searchQuery]
  )

  return (
    <main className='pt-5rem'>
      <div
        // ref={setContainerEl}
        className='bg-secondary p-2.5em mt-2.5rem mr-2rem'
        style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)', position: 'relative' }}
      >
        <h2 className='mb-2rem'>List</h2>

        <input onChange={(e) => setSearchQuery(e.target.value)} value={searchQuery} />

        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Single check/select list
          </label>
          <div>
            <ControlledList
              data={filteredUserList}
              selected={singleSelected}
              checked={singleChecked}
              onCheckOne={(key) => setSingleChecked([key])}
              onUncheckOne={() => setSingleChecked([])}
              onSelectOne={(key) => setSingleSelected([key])}
              onUnselectOne={() => setSingleSelected([])}
              getItemKey={(item) => item.username}
              renderItem={SingleSelectItem}
            />
          </div>
        </div>

        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Multi check/select list
          </label>
          <div>
            <ControlledList
              data={filteredUserList}
              selected={multiSelected}
              checked={multiChecked}
              onCheck={setMultiChecked}
              onSelect={setMultiSelected}
              getItemKey={(item) => item.username}
              renderItem={MultiSelectItem}
            />
          </div>
        </div>

        <div className='mt-1rem flex flex-col'>
          <label htmlFor='readonly' className='label mb-0.25rem'>
            Grouped list
          </label>
          <div>
            <ControlledList
              data={filteredGroupedUserList as User[]}
              selected={groupedSelected}
              checked={groupedChecked}
              isSelectable={(item) => Boolean(item.id)}
              onUncheckOne={() => setGroupedChecked([])}
              onCheckOne={(key) => setGroupedChecked([key])}
              onSelectOne={(key) => setGroupedSelected([key])}
              onUnselectOne={() => setGroupedSelected([])}
              // eslint-disable-next-line @typescript-eslint/no-explicit-any
              getItemKey={(item) => item.username || (item as any).group}
              renderItem={GroupedItem}
            />
          </div>
        </div>
        {/** */}
      </div>
    </main>
  )
}

function SingleSelectItem<P>(props: ItemProps<User, P & ControllableItemProps>) {
  const { isSelected, isChecked } = props

  return (
    <li
      ref={props.setElementRef}
      {...props.itemProps?.controlProps}
      style={{ backgroundColor: isSelected ? 'black' : isChecked ? 'green' : undefined }}
    >
      {props.item.username}
    </li>
  )
}

function GroupedItem<TItemProps>(props: ItemProps<User, TItemProps & ControllableItemProps>) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  if ((props.item as any).group) {
    return (
      <div style={{ padding: '8px' }}>
        <b>
          {/*eslint-disable-next-line @typescript-eslint/no-explicit-any */}
          <pre>Group: {(props.item as any).group}</pre>
        </b>
      </div>
    )
  }
  const { isSelected, isChecked } = props

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      {...props.itemProps?.controlProps}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={props.setElementRef}
      style={{ backgroundColor: isSelected ? 'black' : isChecked ? 'green' : undefined }}
    >
      {props.item.username}
    </li>
  )
}

function MultiSelectItem<P>(props: ItemProps<User, P>) {
  const { isSelected, isChecked } = props

  function select() {
    props.listState?.mitt.emit(EventNames.selectOne, props.itemKey)
  }
  function unselect() {
    // props.listState?.mitt.emit(EventNames.unselectOne, props.itemKey)
  }
  function toggle() {
    if (isChecked) {
      props.listState?.mitt.emit(EventNames.uncheckOne, props.itemKey)
    } else {
      props.listState?.mitt.emit(EventNames.checkOne, props.itemKey)
    }
  }

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key === 'Enter') {
      toggle()
    }
  }

  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <li
      // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
      tabIndex={0}
      onClick={toggle}
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={props.setElementRef}
      onKeyDown={onKeyDown}
      onMouseOver={select}
      onMouseLeave={unselect}
      onBlur={unselect}
      onFocus={select}
      style={{ backgroundColor: isChecked ? 'black' : isSelected ? 'green' : undefined }}
    >
      {props.item.username}
    </li>
  )
}
