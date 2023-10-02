import { MutationOptions, UseMutationResult, useMutation } from 'react-query'

import { QueryError } from '~/shared/types'

import { RequestData, Response, request } from './requests/remove'

export function useRemoveRule(
  options: MutationOptions<Response, QueryError, RequestData>
): UseMutationResult<Response, QueryError, RequestData> {
  return useMutation<Response, QueryError, RequestData>([useRemoveRule.name], request, options)
}
