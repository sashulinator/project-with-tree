import Icon, { IconProps } from '../ui/icon'

export function Dots(props: IconProps): JSX.Element {
  return (
    <Icon {...props}>
      <g clipPath='url(#clip0_1_2)'>
        <path
          d='M112.5 100C112.5 102.472 111.767 104.889 110.393 106.945C109.02 109 107.068 110.602 104.784 111.548C102.499 112.495 99.9861 112.742 97.5614 112.26C95.1366 111.778 92.9093 110.587 91.1612 108.839C89.413 107.091 88.2225 104.863 87.7402 102.439C87.2579 100.014 87.5054 97.5005 88.4515 95.2165C89.3976 92.9324 90.9998 90.9801 93.0554 89.6066C95.111 88.2331 97.5277 87.5 100 87.5C103.315 87.5 106.495 88.817 108.839 91.1612C111.183 93.5054 112.5 96.6848 112.5 100ZM12.5 87.5C10.0277 87.5 7.61099 88.2331 5.55538 89.6066C3.49976 90.9801 1.89761 92.9324 0.951511 95.2165C0.00541601 97.5005 -0.242126 100.014 0.24019 102.439C0.722505 104.863 1.91301 107.091 3.66117 108.839C5.40933 110.587 7.63661 111.778 10.0614 112.26C12.4861 112.742 14.9995 112.495 17.2835 111.548C19.5676 110.602 21.5199 109 22.8934 106.945C24.2669 104.889 25 102.472 25 100C25 96.6848 23.683 93.5054 21.3388 91.1612C18.9946 88.817 15.8152 87.5 12.5 87.5ZM187.5 87.5C185.028 87.5 182.611 88.2331 180.555 89.6066C178.5 90.9801 176.898 92.9324 175.952 95.2165C175.005 97.5005 174.758 100.014 175.24 102.439C175.722 104.863 176.913 107.091 178.661 108.839C180.409 110.587 182.637 111.778 185.061 112.26C187.486 112.742 189.999 112.495 192.284 111.548C194.568 110.602 196.52 109 197.893 106.945C199.267 104.889 200 102.472 200 100C200 96.6848 198.683 93.5054 196.339 91.1612C193.995 88.817 190.815 87.5 187.5 87.5Z'
          fill='currentColor'
        />
      </g>
      <defs>
        <clipPath id='clip0_1_2'>
          <rect width='200' height='200' fill='white' />
        </clipPath>
      </defs>
    </Icon>
  )
}
