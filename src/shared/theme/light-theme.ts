import { nodeLightTheme } from '~/entities/point'
import { lightTheme as pointJoint } from '~/entities/point/ui/node/widgets/joint'
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
  ...pointJoint,
  ...textInput,
  ...unstyledButton,
}
