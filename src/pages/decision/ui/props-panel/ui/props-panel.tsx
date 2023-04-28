import { State } from '~/packages/chart'

interface PropsPanelPropsProps {
  state: State
}

export default function PropsPanelProps(props: PropsPanelPropsProps): JSX.Element {
  return (
    <div className='PropsPanelProps'>
      <button onClick={onClick}>Save</button>
    </div>
  )

  // Private

  function onClick(): void {
    Object.values(props.state.states).map((state) => {
      console.log(state.normalize())
    })
  }
}
