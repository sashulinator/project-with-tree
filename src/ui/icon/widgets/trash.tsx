import Icon, { IconProps } from '../ui/icon'

export function Trash(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <g filter='url(#a)'>
        <path
          stroke='currentColor'
          strokeLinecap='round'
          strokeLinejoin='round'
          strokeWidth={14}
          d='M75 25h50M25 50h150m-16.667 0-5.844 87.661c-.877 13.152-1.315 19.728-4.156 24.714a24.998 24.998 0 0 1-10.819 10.122C132.35 175 125.759 175 112.577 175H87.423c-13.182 0-19.773 0-24.937-2.503a24.997 24.997 0 0 1-10.82-10.122c-2.84-4.986-3.278-11.562-4.155-24.714L41.667 50'
          shapeRendering='crispEdges'
        />
      </g>
      <defs>
        <filter
          id='a'
          width={172}
          height={172}
          x={14}
          y={18}
          colorInterpolationFilters='sRGB'
          filterUnits='userSpaceOnUse'
        >
          <feFlood floodOpacity={0} result='BackgroundImageFix' />
          <feColorMatrix in='SourceAlpha' result='hardAlpha' values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0' />
          <feOffset dy={4} />
          <feGaussianBlur stdDeviation={2} />
          <feComposite in2='hardAlpha' operator='out' />
          <feColorMatrix values='0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0' />
          <feBlend in2='BackgroundImageFix' result='effect1_dropShadow_11_6' />
          <feBlend in='SourceGraphic' in2='effect1_dropShadow_11_6' result='shape' />
        </filter>
      </defs>
    </Icon>
  )
}
