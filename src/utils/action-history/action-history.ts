import { Id, generateId } from '../core'
import { Step } from './types/step'

export class ActionHistory<TStep extends Step = Step> {
  steps: TStep[]

  constructor(steps?: TStep[]) {
    this.steps = steps || []
  }

  addStep(item: Omit<TStep, 'id'> & { id?: Id }) {
    const lastStep = this.steps[0]

    if (lastStep && !lastStep.done) {
      const index = this.steps.findIndex((step) => step.done)
      this.steps = this.steps.slice(index)
    }

    this.steps.unshift({ id: generateId(), ...item } as TStep)
  }

  findCurrent(): TStep | undefined {
    return this.steps.find((item, i) => {
      return item.done
    })
  }

  findNext(): TStep | undefined {
    for (let i = 0; i < this.steps.length; i++) {
      const item = this.steps[i]
      const nextItem = this.steps[i + 1]
      const isLast = i === this.steps.length - 1
      // Если первый и второй done то next не существует
      if (i === 0 && item?.done && nextItem?.done) return undefined
      // Если следующий done значит он current, а этот next
      if (nextItem?.done) return item
      // Если все элементы не done, то последний next
      if (isLast) return item
    }
  }

  findPrevious(): TStep | undefined {
    return this.steps.find((_, i) => this.steps[i - 1]?.done)
  }
}
