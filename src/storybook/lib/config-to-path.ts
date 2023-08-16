import { Config } from '../types'

export function configToPath(config: Pick<Config<unknown>, 'getPath' | 'getName'>): string {
  return config.getPath?.() ?? `${config.getName().toLowerCase()}`
}
