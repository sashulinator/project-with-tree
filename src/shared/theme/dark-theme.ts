import { editorDarkTheme } from '~/entities/decision'
import { jointDarkTheme, nodeDarkTheme } from '~/entities/point'
import { darkTheme as editable } from '~/ui/editable'
import { darkTheme as textInput } from '~/ui/text-input'
import { darkTheme as unstyledButton } from '~/ui/unstyled-button'

export const darkTheme = {
  ...editorDarkTheme,

  ...editable,
  ...nodeDarkTheme,
  ...jointDarkTheme,
  ...textInput,
  ...unstyledButton,
}
