import { nodeDarkTheme } from '~/entities/point'
import { darkTheme as pointJoint } from '~/entities/point/ui/node/widgets/joint'
import { darkTheme as editable } from '~/ui/editable'
import { darkTheme as textInput } from '~/ui/text-input'
import { darkTheme as unstyledButton } from '~/ui/unstyled-button'

import * as commonTheme from './common'
import { DARK } from './dark'

export const darkTheme = {
  ...commonTheme,
  ...DARK,

  ...editable,
  ...nodeDarkTheme,
  ...pointJoint,
  ...textInput,
  ...unstyledButton,
}
