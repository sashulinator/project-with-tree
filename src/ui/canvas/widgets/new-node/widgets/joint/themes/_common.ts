import clr from 'color'

import { CSSVars } from '../types/css-vars'

const linked = clr('rgb(83, 160, 255)')
const new_ = clr('rgb(84, 222, 104)')
const unlinked = clr('rgb(255, 255, 255)')

export const commonTheme: CSSVars = {
  point_nodeJoint_bg__linked: linked,
  point_nodeJoint_bg__new: new_,
  point_nodeJoint_bg__unlinked: unlinked,

  point_nodeJoint_outline__linked: linked.alpha(0.5),
  point_nodeJoint_outline__new: new_.alpha(0.5),
  point_nodeJoint_outline__unlinked: unlinked.alpha(0.5),
}
