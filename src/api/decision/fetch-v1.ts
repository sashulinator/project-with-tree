import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'

import { QueryError } from '~/shared/types'

import { RequestData, Response, ResponseData, makeRequest, url } from './v1/fetch'

export type Keys = [string, string, RequestData]
export type Options<TData = ResponseData> = UseQueryOptions<Response, QueryError, TData, Keys>
export type QueryResult<TData = ResponseData> = UseQueryResult<TData, QueryError>

export function useFetchRulesV1<TData = ResponseData>(
  preferedOptions: Options<TData>,
  requestData: RequestData
): QueryResult<TData> {
  const keys: Keys = [url, useFetchRulesV1.name, requestData]

  const options: Options<TData> = {
    select: (axiosResponse) => axiosResponse.data as TData,
    enabled: Boolean(requestData.decisionId),
    ...preferedOptions,
  }

  return useQuery(keys, () => makeRequest(requestData), options)
}
