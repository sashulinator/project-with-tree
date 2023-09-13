import { AxiosResponse } from 'axios'

import api from '~/shared/axios'
import { Id } from '~/utils/core'

export type ResponseData = {
  message: string
  response_code: '200'
}

export type RequestData = {
  id: Id
}

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/attribute`

export async function request(requestData: RequestData): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.delete<ResponseData>(`${url}/${requestData.id}`)
  // TODO validation
  return response
}
