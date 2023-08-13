import { PaginationRange } from '../ui/pagination'

export function getPaginationRange(pageSize: number, currentPage: number): PaginationRange {
  let result: PaginationRange = []
  if (pageSize < 7) {
    for (let i = 1; i <= pageSize; i++) {
      result.push(i)
    }
  } else if (currentPage <= 3) {
    result = [1, 2, 3, '>', pageSize - 2, pageSize - 1, pageSize]
  } else if (currentPage >= pageSize - 2) {
    result = [1, 2, 3, '<', pageSize - 2, pageSize - 1, pageSize]
  } else {
    result = [1, '<', currentPage - 1, currentPage, currentPage + 1, '>', pageSize]
  }

  return result
}
