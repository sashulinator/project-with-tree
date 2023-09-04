import { AxiosResponse } from 'axios'

import api from '~/shared/axios'

import { ParentDomainRes } from '../types/parent-domain-res'

export interface RequestData {
  page: number
  limit: number
}

export type ResponseData = { total: number; items: ParentDomainRes[] }

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/domain/domainAttributes`

export async function request(requestData: RequestData): Promise<Response> {
  // TODO validation
  const response = await api.get<ResponseData>(`${url}`, {
    params: { page: requestData.page, limit: requestData.limit },
  })
  // TODO validation
  return response
}
