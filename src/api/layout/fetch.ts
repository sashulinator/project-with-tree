import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'

import { QueryError } from '~/shared/types'
import { Id } from '~/utils/core'

import { RequestData, Response, ResponseData, makeRequest, url } from './v1/fetch'

export type OptionalRequestData = { id: Id | undefined }

export type Options<TData = ResponseData> = UseQueryOptions<
  Response,
  QueryError,
  TData,
  [string, string, OptionalRequestData]
>
export type QueryResult<TData = ResponseData> = UseQueryResult<TData, QueryError>

export function useFetchLayout<TData = ResponseData>(
  preferedOptions: Options<TData>,
  requestData: OptionalRequestData
): QueryResult<TData> {
  const keys: [string, string, OptionalRequestData] = [url, useFetchLayout.name, requestData]

  const options: Options<TData> = {
    select: (axiosResponse) => axiosResponse.data as TData,
    enabled: Boolean(requestData.id),
    ...preferedOptions,
  }

  return useQuery(keys, () => makeRequest(requestData as RequestData), options)
}
