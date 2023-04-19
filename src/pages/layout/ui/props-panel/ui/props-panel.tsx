import { Layout } from '~/entities/layout'

interface PropsPanelPropsProps {
  layout?: Layout | undefined
}

export default function PropsPanelProps(props: PropsPanelPropsProps): JSX.Element {
  return <div className='PropsPanelProps'>PropsPanelProps</div>
}
