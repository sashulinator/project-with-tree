import { NodeState, Point } from '~/entities/point'

export const point: Point = {
  type: 'MAIN',
  id: 'id2',
  name: 'Базовые условия',
  description: 'Описание ноды не более чем в 250 символов. Должно хватить для краткого описания',
  x: 40,
  y: 20,
}

export const state = new NodeState({ point })
