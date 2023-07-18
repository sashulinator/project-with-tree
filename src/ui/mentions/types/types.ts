import { OnChangeHandlerFunc } from 'react-mentions'
import { FieldProps } from '~/abstract/field'

export interface IMentionsItem {
  display: string
  id: string
}

export interface IMentionsProps extends FieldProps {
  data: IMentionsItem[]
  defaultFocus?: boolean | undefined
  focusedChange: () => void
  attributeValue?: string
  value?: string | undefined
  onChangeValue?: OnChangeHandlerFunc | undefined
}
