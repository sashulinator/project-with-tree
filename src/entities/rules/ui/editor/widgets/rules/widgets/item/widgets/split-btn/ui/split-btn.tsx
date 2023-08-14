import { useSetRecoilState } from 'recoil'

import { getSplitArr } from '~/entities/rules/lib/get-split-arr'
import { editorRulesValuesAtom } from '~/entities/rules/models/editorRulesValues'
import { GhostButton, GhostButtonProps } from '~/ui/button'
import { Split } from '~/ui/icon/variants/split'

interface SplitBtnProps {
  index: number
  rootProps?: GhostButtonProps
}

export default function SplitBtn(props: SplitBtnProps): JSX.Element {
  const { index, rootProps } = props
  const setEditorVales = useSetRecoilState(editorRulesValuesAtom)

  return (
    <GhostButton height={'m'} padding={rootProps?.padding || 's'} onClick={splitCondition} {...rootProps}>
      <Split width={25} height={25} />
    </GhostButton>
  )

  function splitCondition(): void {
    setEditorVales((arr) => getSplitArr(arr, index))
  }
}
