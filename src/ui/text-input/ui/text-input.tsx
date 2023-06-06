import TextInputUI, { TextInputProps } from '~/abstract/text-input'

export type { TextInputProps }

export default function TextInput(props: TextInputProps): JSX.Element {
  return <TextInputUI {...props} />
}
