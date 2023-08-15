import { c } from '~/utils/core'

Select.displayName = 'story-Select'

export interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  options?: number[]
}

export default function Select(props: Props): JSX.Element {
  const { options, ...selectProps } = props
  return (
    <select {...selectProps} className={c(props.className, Select.displayName)}>
      {options?.map((option) => {
        return (
          <option key={option} value={option}>
            {option}
          </option>
        )
      })}
    </select>
  )
}
