import { lightTheme as pointNode } from '~/entities/point/ui/node/themes'
import { lightTheme as pointJoint } from '~/entities/point/widgets/joint'
import { lightTheme as editable } from '~/ui/editable'
import { lightTheme as textInput } from '~/ui/text-input'
import { lightTheme as unstyledButton } from '~/ui/unstyled-button'

import * as commonTheme from './common'
import { light } from './light'

export const lightTheme = {
  ...commonTheme,
  ...light,

  ...editable,
  ...pointNode,
  ...pointJoint,
  ...textInput,
  ...unstyledButton,
}
