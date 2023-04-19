import { Any } from '~/utils/core'

import { InputRenderProps, OnInputRender } from './input-render'
import { OnListRender } from './list-render'

export type DropdownProps<
  I extends InputRenderProps,
  LP extends { filter?: ((...a: Any[]) => Any) | undefined }
> = I & {
  renderInput: OnInputRender<Omit<I, keyof DropdownProps<I, LP>>> | 'input'
  listProps: LP
  renderList: OnListRender<LP>
  clearValue: () => void
}
