import { AxiosResponse } from 'axios'

import api from '~/shared/axios'

import { RequestAttribute } from '../types/request-attribute'

interface ResponseData {
  message: string
  response_code: '200'
}

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/attribute/createAttribute`

export async function requestAttribute(requestData: RequestAttribute): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}`, requestData)
  // TODO validation
  return response
}
