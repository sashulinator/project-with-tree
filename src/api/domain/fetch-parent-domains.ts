import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'

import { QueryError } from '~/shared/types'

import { RequestData, Response, ResponseData, request, url } from './request/fetch-parent-domains'

export type Keys = [string, string, RequestData]
export type Options<TData = ResponseData> = UseQueryOptions<Response, QueryError, TData, Keys>
export type QueryResult<TData = ResponseData> = UseQueryResult<TData, QueryError>

export function useFetchParentDomainList<TData = ResponseData>(
  requestData: RequestData,
  preferredOptions?: Options<TData>
): QueryResult<TData> {
  const keys: Keys = [url, useFetchParentDomainList.name, requestData]

  const options: Options<TData> = {
    select: (axiosResponse) => axiosResponse.data as TData,
    ...preferredOptions,
  }

  return useQuery(keys, () => request(requestData), options)
}
