import { MutableRefObject } from 'react'

export interface InputRenderProps
  extends Partial<Pick<React.InputHTMLAttributes<HTMLInputElement>, 'value' | 'onClick' | 'onChange' | 'onKeyDown'>> {
  ref?: MutableRefObject<HTMLInputElement>
}

export type OnInputRender<P> = (props: Required<InputRenderProps> & P) => React.ReactNode
