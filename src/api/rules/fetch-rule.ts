import { UseQueryOptions, UseQueryResult, useQuery } from 'react-query'

import { QueryError } from '~/shared/types'

import { RequestData, Response, ResponseData, requestRule, url } from './requests/fetch-rule'

export type Keys = [string, string, RequestData]
export type Options<TData = ResponseData> = UseQueryOptions<Response, QueryError, TData, Keys>
export type QueryResult<TData = ResponseData> = UseQueryResult<TData, QueryError>

export function useFetchRule<TData = ResponseData>(requestData: RequestData, id: string): QueryResult<TData> {
  const keys: Keys = [url, useFetchRule.name, requestData]

  return useQuery(keys, () => requestRule(requestData, id))
}
