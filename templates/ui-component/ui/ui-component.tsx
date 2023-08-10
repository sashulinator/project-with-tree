import './ui-component.css'

UIComponent.displayName = 'ui-Component'

export interface UIComponentProps {
  className: string
}

export default function UIComponent(props: UIComponentProps): JSX.Element {
  return <div className={c(UIComponent.displayName)}>UIComponent</div>
}
