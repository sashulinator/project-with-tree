import { Point, PointState } from '~/entities/point'

export const point: Point = {
  type: 'MAIN',
  id: 'id2',
  name: 'Базовые условия',
  description: 'Описание ноды не более чем в 250 символов. Должно хватить для краткого описания',
  x: 450,
  y: 200,
  children: ['id3'],
}

export const state = new PointState(point, { id: '1', position: { x: 10, y: 40 } })
