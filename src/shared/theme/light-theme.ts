import { jointLightTheme, nodeLightTheme } from '~/entities/point'
import { lightTheme as editable } from '~/ui/editable'
import { lightTheme as textInput } from '~/ui/text-input'
import { lightTheme as unstyledButton } from '~/ui/unstyled-button'

import * as commonTheme from './common'
import { LIGHT } from './light'

export const lightTheme = {
  ...commonTheme,
  ...LIGHT,

  ...editable,
  ...nodeLightTheme,
  ...jointLightTheme,
  ...textInput,
  ...unstyledButton,
}
