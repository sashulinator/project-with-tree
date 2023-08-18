import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'

import { QueryError } from '~/shared/types'

import { RequestData, Response, ResponseData, request, url } from './requests/fetch'

export type Keys = [string, string, RequestData]
export type Options<TData = ResponseData> = UseQueryOptions<Response, QueryError, TData, Keys>
export type QueryResult<TData = ResponseData> = UseQueryResult<TData, QueryError>

export function useFetchDecision<TData = ResponseData>(
  requestData: RequestData,
  preferedOptions?: Options<TData>
): QueryResult<TData> {
  const keys: Keys = [url, useFetchDecision.name, requestData]

  const options: Options<TData> = {
    select: (axiosResponse) => axiosResponse.data as TData,
    ...preferedOptions,
  }

  return useQuery(keys, () => request(requestData), options)
}
