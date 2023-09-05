import { AxiosResponse } from 'axios'

import api from '~/shared/axios'

interface RequestData {
  name: string
  keyName: string
  description: string
  type: string
  parentId: string
  sourceSystemId: string
  userId: string
}

interface ResponseData {
  message: string
  response_code: '200'
}

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/domain/createDomain`

export async function requestDomain(requestData: RequestData): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}`, requestData)
  // TODO validation
  return response
}
