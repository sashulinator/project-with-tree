import { clsx } from 'clsx'

import AbstractIcon, { IconProps } from '~/abstract/icon'

Icon.displayName = 'ui-Icon'

export type { IconProps }

export default function Icon(props: IconProps): JSX.Element {
  return <AbstractIcon {...props} className={clsx(Icon.displayName, props.className)} />
}
