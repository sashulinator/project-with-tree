import { AxiosResponse } from 'axios'

import { Decision } from '~/entities/decision'
import api from '~/shared/axios'

export interface RequestData {
  page: number
  limit: number
}

export type ResponseData = { total: number; items: Decision[] }

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/tree/decisionUITreeList`

export async function request(requestData: RequestData): Promise<Response> {
  // TODO validation
  const response = await api.get<ResponseData>(`${url}`, {
    params: { page: requestData.page, limit: requestData.limit },
  })
  // TODO validation
  return response
}
