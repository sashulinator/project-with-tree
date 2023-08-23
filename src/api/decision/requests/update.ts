import { AxiosResponse } from 'axios'

import { Decision } from '~/entities/decision'
import api from '~/shared/axios'

export interface RequestData {
  decision: Decision
}

export type ResponseData = Decision

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/tree`

export async function request(requestData: RequestData): Promise<Response> {
  console.log('requestData', requestData)

  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}/${requestData.decision.id}`, requestData.decision)
  // TODO validation
  return response
}
