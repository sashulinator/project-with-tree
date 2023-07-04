import { editorLightTheme } from '~/entities/decision'
import { jointLightTheme, nodeLightTheme } from '~/entities/point'
import { lightTheme as editable } from '~/ui/editable'
import { lightTheme as textInput } from '~/ui/text-input'
import { lightTheme as unstyledButton } from '~/ui/unstyled-button'

export const lightTheme = {
  ...editorLightTheme,

  ...editable,
  ...nodeLightTheme,
  ...jointLightTheme,
  ...textInput,
  ...unstyledButton,
}
