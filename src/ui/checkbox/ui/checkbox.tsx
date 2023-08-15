import './checkbox.css'

import { emitter } from '~/shared/emitter'
import { Check } from '~/ui/icon/variants/check'
import { c } from '~/utils/core'

import { dark } from '../themes/dark'
import { light } from '../themes/light'

emitter.emit('addTheme', { dark, light })

Checkbox.displayName = 'ui-Checkbox'

export interface CheckboxProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'height'> {
  labelProps?: React.LabelHTMLAttributes<HTMLLabelElement>
  height?: 's' | 'm' | 'l' | undefined
  round?: boolean
}

export default function Checkbox(props: CheckboxProps): JSX.Element {
  const { labelProps, height = 'm', className, checked = false, round, ...checkboxProps } = props

  return (
    <label
      {...labelProps}
      className={c(
        Checkbox.displayName,
        labelProps?.className,
        className,
        props.checked && '--checked',
        height && `--${height}`,
        round && `--round`
      )}
    >
      <input {...checkboxProps} checked={checked} type='checkbox' className={c(props.className, 'input')} />
      <div className='box'>{checked && <Check />}</div>
      {props.placeholder && <span>{props.placeholder}</span>}
    </label>
  )
}
