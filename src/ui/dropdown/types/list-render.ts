import { SetterOrUpdater } from '~/utils/core'

export interface ListProps {
  isOpen: boolean
  inputElement: HTMLInputElement
  searchQuery: string
  setOpen: SetterOrUpdater<boolean>
  setSearchQuery: SetterOrUpdater<string>
}

export type OnListRender<P> = (props: ListProps & P) => JSX.Element | null
