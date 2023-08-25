import { AxiosResponse } from 'axios'

import api from '~/shared/axios'

export interface RequestData {
  name: string
  keyName: string
  frontValue: string
}

export type ResponseData = {
  message: 'Rule created successfully'
  response_code: '200'
}

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/rule/createRule`

export async function requestRule(requestData: RequestData): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}`, requestData)
  // TODO validation
  return response
}
