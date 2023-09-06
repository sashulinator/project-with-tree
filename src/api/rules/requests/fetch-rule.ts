import { AxiosResponse } from 'axios'

import { RulesRes } from '~/entities/rule/types/rules-type'
import api from '~/shared/axios'

export interface RequestData {}

export type ResponseData = {
  data: RulesRes
}

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/rule`

export async function requestRule(requestData: RequestData, id): Promise<Response> {
  // TODO validation
  const response = await api.get<ResponseData>(`${url}/${id}`)
  // TODO validation
  return response
}
