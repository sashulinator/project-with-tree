import { ForwardedRef, forwardRef } from 'react'

import { c } from '~/utils/core'

IconComponent.displayName = 'a-Icon'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IconProps extends React.HTMLAttributes<SVGSVGElement> {
  height?: string | number
  width?: string | number
}

function IconComponent(props: IconProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  return (
    <svg
      viewBox='0 0 24 24'
      height='1rem'
      width='1rem'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      ref={ref}
      {...props}
      className={c(props.className, IconComponent.displayName)}
    />
  )
}

const IconWrapper = forwardRef(IconComponent)
export default IconWrapper
