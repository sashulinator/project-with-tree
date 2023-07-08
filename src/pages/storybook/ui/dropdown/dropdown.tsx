import { useRef, useState } from 'react'

// import DropdownList from '~/ui/dropdown-list/ui/dropdown-list'
// import { SelectableItemComponentProps } from '~/ui/list'
import Dropdown from '~/ui/dropdown'
import { DropdownItem, DropdownItemProps } from '~/ui/dropdown-list'
import DropdownList, { DropdownListProps } from '~/ui/dropdown-list/ui/dropdown-list'
import Input, { InputProps } from '~/ui/input'
import { Key, ListState } from '~/ui/list'

// import TextInput from '~/ui/text-input/ui/text-input'

interface User {
  id: string
  username: string
  sex: string
}

const data: User[] = [
  {
    id: '1',
    username: 'Vasya',
    sex: 'male',
  },
  {
    id: '2',
    username: 'Petya',
    sex: 'male',
  },
  {
    id: '3',
    username: 'Olya',
    sex: 'female',
  },
  {
    id: '4',
    username: 'Lena',
    sex: 'female',
  },
  {
    id: '5',
    username: 'Kira',
    sex: 'female',
  },
  {
    id: '6',
    username: 'Misha',
    sex: 'male',
  },
  {
    id: '7',
    username: 'John',
    sex: 'male',
  },
  {
    id: '8',
    username: 'Jxxdohn',
    sex: 'male',
  },
  {
    id: '9',
    username: 'Johdxn',
    sex: 'male',
  },
  {
    id: '10',
    username: 'Jodhdxn',
    sex: 'male',
  },
  {
    id: '11',
    username: 'Jodhxn',
    sex: 'male',
  },
  {
    id: '12',
    username: 'Koko',
    sex: 'male',
  },
]

export default function DropdownPage(): JSX.Element {
  const [checked, setChecked] = useState<Key[]>([])
  const [selected, setSelected] = useState<Key[]>([])
  const listStateRef = useRef<ListState<User>>(null)
  const value = checked[0] || ''
  const item = listStateRef.current?.map.get(value)?.item

  return (
    <div
      className='w-20rem bg-secondary p-2.5em mt-2.5rem'
      style={{ borderRadius: '20px', border: '1px solid var(--input_borderColor)' }}
    >
      <h2 className='mb-2rem'>Dropdown</h2>
      <div className='mt-1rem'>
        <label htmlFor='readonly' className='label ml-0.25rem'>
          Dropdown
        </label>
        <Dropdown<InputProps, DropdownListProps<User, DropdownItemProps<User, unknown>>>
          value={item?.username || ''}
          renderInput={Input}
          renderList={DropdownList}
          clearValue={(): void => setChecked([])}
          listProps={{
            rootProps: {
              style: {
                backgroundColor: 'var(--bgSecondary)',
                border: '1px solid #ccc',
                boxShadow: '0px 1.2px 18px rgba(0, 0, 0, 0.15), 0px 6.4px 29px rgba(0, 0, 0, 0.15)',
                maxHeight: '150px',
                overflow: 'auto',
                borderRadius: '8px',
                padding: '12px 0',
              },
            },
            offset: [0, 5],
            data,
            selected,
            checked,
            listStateRef: listStateRef,
            getItemKey: (item) => item.username,
            filter: (item, sq) => (sq ? new RegExp(sq, 'gi').test(item.username) : true),
            renderItem: DropdownItem,
            onSelectOne: (k) => setSelected([k]),
            onUnselectOne: () => setSelected([]),
            onCheckOne: (key) => setChecked(() => [key]),
          }}
        />
      </div>
    </div>
  )
}
