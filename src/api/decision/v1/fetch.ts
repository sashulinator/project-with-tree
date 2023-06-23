import { AxiosResponse } from 'axios'

import { Rule } from '~/entities/rule'
import api from '~/shared/axios'
import { Id } from '~/utils/core'

export interface RequestData {
  decisionId: Id
}

export type ResponseData = Rule[]

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v2/decision`

export async function makeRequest(requestData: RequestData): Promise<Response> {
  // TODO validation
  const response = await api.get<ResponseData>(`${url}/${requestData.decisionId}`)
  // TODO validation
  return response
}
