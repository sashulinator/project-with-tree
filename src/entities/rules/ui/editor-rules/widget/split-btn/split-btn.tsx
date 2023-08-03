import { useSetRecoilState } from 'recoil'
import { getSplitArr } from '~/entities/rules/lib'
import { editorRulesValuesAtom } from '~/entities/rules/state/state'
import { GhostButton, GhostButtonProps } from '~/ui/button'
import { Split } from '~/ui/icon/variants/split'

interface SplitBtnProps {
  index: number
  rootProps?: GhostButtonProps
}

export function SplitBtn(props: SplitBtnProps): JSX.Element {
  const { index, rootProps } = props
  const setEditorRulesVales = useSetRecoilState(editorRulesValuesAtom)

  return (
    <GhostButton height={'m'} padding={rootProps?.padding || 's'} onClick={splitCondition} {...rootProps}>
      <Split width={25} height={25} />
    </GhostButton>
  )

  function splitCondition(): void {
    setEditorRulesVales((arr) => getSplitArr(arr, index))
  }
}
