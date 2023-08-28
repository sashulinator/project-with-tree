import { AxiosResponse } from 'axios'

import api from '~/shared/axios'

import { RequestData } from '../types/RequestRule'
import { ResponseData } from '../types/response-data'

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/rule/createRule`

export async function requestRule(requestData: RequestData): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}`, requestData)
  // TODO validation
  return response
}
