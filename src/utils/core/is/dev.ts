/**
 * Returns `true` if the application is running in a development environment, `false` otherwise.
 *
 * @return {boolean} `true` if the application is in development, `false` otherwise.
 */
export function isDev(): boolean {
  return process.env.NODE_ENV === 'development'
}
