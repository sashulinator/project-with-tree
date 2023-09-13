import { AxiosResponse } from 'axios'

import { Domain } from '~/entities/domain'
import api from '~/shared/axios'

export type CreateDomain = Omit<Domain, 'id' | 'rev' | 'createdBy' | 'updatesBy' | 'createDttm' | 'updateDttm'>

export type RequestData = {
  domain: CreateDomain
}
interface ResponseData {
  message: string
  response_code: '200'
}

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/domain/createDomain`

export async function request(requestData: RequestData): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}`, requestData.domain)
  // TODO validation
  return response
}
