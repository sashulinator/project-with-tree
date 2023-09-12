import { MutationOptions, UseMutationResult, useMutation } from 'react-query'

import { QueryError } from '~/shared/types'

import { RequestData, Response, request } from './requests/update'

export function useUpdateDomain(
  options: MutationOptions<Response, QueryError, RequestData>
): UseMutationResult<Response, QueryError, RequestData> {
  return useMutation<Response, QueryError, RequestData>([useUpdateDomain.name], request, options)
}
