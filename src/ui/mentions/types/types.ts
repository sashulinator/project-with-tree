import { OnChangeHandlerFunc } from 'react-mentions'
import { FieldProps } from '~/abstract/field'

export interface MentionsItem {
  display: string
  id: string
}

export interface IMentionsProps extends FieldProps {
  data: MentionsItem[]
  defaultFocus?: boolean | undefined
  focusedChange: () => void
  attributeValue?: string
  value?: string | undefined
  onChangeValue?: OnChangeHandlerFunc | undefined
}
