import './attribute-for-domain.css'

import Attribute, { AttributeProps } from '~/entities/attribute/ui/attribute'

interface Props extends AttributeProps {}

AttributeForDomain.displayName = 'e-domain-ui-w-AttributeForDomain'

export default function AttributeForDomain(props: Props): JSX.Element {
  return <Attribute wrapperProps={{ className: AttributeForDomain.displayName }} data={props.data} />
}
