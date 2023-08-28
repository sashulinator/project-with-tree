import { AxiosResponse } from 'axios'

import { RulesRes } from '~/entities/rules/types/rules-type'
import api from '~/shared/axios'

export interface RequestData {
  page: number
  limit: number
}

export type ResponseData = { total: number; items: RulesRes[] }

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/rule/ruleList`

export async function request(requestData: RequestData): Promise<Response> {
  // TODO validation
  const response = await api.get<ResponseData>(`${url}`, {
    params: { page: requestData.page, limit: requestData.limit },
  })
  // TODO validation
  return response
}
