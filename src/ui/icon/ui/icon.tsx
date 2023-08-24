import AbstractIcon, { IconProps } from '~/abstract/icon'
import { c } from '~/utils/core'

Icon.displayName = 'ui-Icon'

export type { IconProps }

export default function Icon(props: IconProps): JSX.Element {
  return <AbstractIcon {...props} className={c(Icon.displayName, props.className)} />
}
