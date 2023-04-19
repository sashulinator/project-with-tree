import TextInput from '~/ui/text-input/ui/text-input'
import { Dictionary } from '~/utils/dictionary'

export interface ComponentMapItem {
  component: React.FunctionComponent<{ children?: React.ReactNode }>
}

export const components: Dictionary<ComponentMapItem> = {
  TextInput: {
    component: TextInput,
  },
  RootBox: {
    component: 'div' as unknown as React.FunctionComponent,
  },
}
