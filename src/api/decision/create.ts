import { MutationOptions, UseMutationResult, useMutation } from 'react-query'

import { QueryError } from '~/shared/types'

import { RequestData, Response, request } from './requests/create'

export function useCreateDecision(
  options: MutationOptions<Response, QueryError, RequestData>
): UseMutationResult<Response, QueryError, RequestData> {
  return useMutation<Response, QueryError, RequestData>([useCreateDecision.name], request, options)
}
