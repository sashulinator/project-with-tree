import { AxiosResponse } from 'axios'

import api from '~/shared/axios'

import { RequestData } from '../types/RequestRule'

export type ResponseData = {
  message: 'Rule created successfully'
  response_code: '200'
}

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/rule`

export async function requestRuleUpdate(requestData: RequestData, id): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}/${id}`, requestData)
  // TODO validation
  return response
}
