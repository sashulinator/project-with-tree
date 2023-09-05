import { AxiosResponse } from 'axios'

import api from '~/shared/axios'

import { RequestDomain } from '../types/request-domain'

interface ResponseData {
  message: string
  response_code: '200'
}

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/domain/createDomain`

export async function requestDomain(requestData: RequestDomain): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}`, requestData)
  // TODO validation
  return response
}
