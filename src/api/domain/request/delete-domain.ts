import { AxiosResponse } from 'axios'

import api from '~/shared/axios'

export type ResponseData = {
  message: 'Rule created successfully'
  response_code: '200'
}

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/domain`

export async function requestDomainDelete(id): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.delete<ResponseData>(`${url}/${id}`)
  // TODO validation
  return response
}
