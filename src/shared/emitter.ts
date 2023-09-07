import { Location } from 'react-router-dom'

import { onThemesAdd } from '~/lib/theme/on-themes-add'
import { setDocumentTitle } from '~/utils/core'
import { Emitter } from '~/utils/emitter'
import { Themes } from '~/utils/theme'

import { Route } from './routes'
import { DARK, LIGHT } from './theme'

export type Events = {
  /**
   * Добавить тему или переменные к существующим
   */
  addThemes: Themes

  /**
   * Добавить пути к уже имеющимся
   */
  addRoutes: Record<string, Route>

  /**
   * Установить title для document
   */
  setDocumentTitle: string[]

  /**
   * Подписка на событие смены location
   */
  locationChanged: Location

  /**
   * Подписка на событие смены route
   */
  routeChanged: Route
}

export const emitter = new Emitter<Events>()

emitter.on('addThemes', onThemesAdd)
emitter.on('setDocumentTitle', setDocumentTitle)
emitter.on('routeChanged', (route) => emitter.emit('setDocumentTitle', ['Colibri', route.getName()]))

emitter.emit('addThemes', { dark: DARK, light: LIGHT })
