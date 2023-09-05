import { AxiosResponse } from 'axios'

import api from '~/shared/axios'

export type ResponseData = {
  message: string
  response_code: '200'
}

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/attribute`

export async function requestAttributeDelete(id): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.delete<ResponseData>(`${url}/${id}`)
  // TODO validation
  return response
}
