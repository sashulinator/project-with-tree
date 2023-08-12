import './flex.css'

import { c } from '~/utils/core'

Flex.displayName = 'a-Flex'

export interface FlexProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
  dir?: 'column' | 'row'
  mainAxis?: 'center' | 'start' | 'end' | 'space-between' | 'space-around' | 'space-evenly'
  crossAxis?: 'center' | 'start' | 'end' | 'stretch'
  margin?: string
  padding?: string
  width?: string
  height?: string
  children?: React.ReactNode
  style?: React.CSSProperties | undefined
  gap?: 'xs' | 's' | 'm' | 'l' | 'xl' | 'xxl' | 'xxxl' | undefined
}

export default function Flex(props: FlexProps): JSX.Element {
  const {
    dir = 'row',
    gap,
    mainAxis = 'start',
    crossAxis = 'start',
    margin,
    padding,
    children,
    width,
    height,
    style,
    // eslint-disable-next-line prettier/prettier
    ...divProps
  } = props

  return (
    <div
      {...divProps}
      className={c(
        props.className,
        Flex.displayName,
        `--${dir}`,
        gap && `--${gap}`,
        `--mainAxis-${mainAxis}`,
        `--crossAxis-${crossAxis}`
      )}
      style={{
        margin,
        padding,
        width,
        height,
        ...style,
      }}
    >
      {children}
    </div>
  )
}
