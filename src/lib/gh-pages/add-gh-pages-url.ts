export function addGHPagesUrl(url: string): string {
  if (location.host.match('github')) {
    return `/project-with-tree${url}`
  }
  return url
}
