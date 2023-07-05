import { clsx } from 'clsx'
import { ForwardedRef, forwardRef } from 'react'

IconComponent.displayName = 'a-Icon'

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface IconWrapperProps extends React.HTMLAttributes<SVGSVGElement> {}

function IconComponent(props: IconWrapperProps, ref: ForwardedRef<SVGSVGElement>): JSX.Element {
  return (
    <svg
      viewBox='0 0 200 200'
      fill='none'
      xmlns='http://www.w3.org/2000/svg'
      ref={ref}
      {...props}
      className={clsx(props.className, IconComponent.displayName)}
    />
  )
}

const IconWrapper = forwardRef(IconComponent)
export default IconWrapper
