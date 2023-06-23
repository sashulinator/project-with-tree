import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'

import { QueryError } from '~/shared/types'

import { RequestData, Response, ResponseData, makeRequest, url } from './mock/fetch'

export type Keys = [string, string, RequestData]
export type Options<TData = ResponseData> = UseQueryOptions<Response, QueryError, TData, Keys>
export type QueryResult<TData = ResponseData> = UseQueryResult<TData, QueryError>

export function useFetchDecisionMock<TData = ResponseData>(
  preferedOptions: Options<TData>,
  requestData: RequestData
): QueryResult<TData> {
  const keys: Keys = [url, useFetchDecisionMock.name, requestData]

  const options: Options<TData> = {
    select: (axiosResponse) => axiosResponse.data as TData,
    enabled: Boolean(requestData.id),
    ...preferedOptions,
  }

  return useQuery(keys, () => makeRequest(requestData), options)
}
