import { AxiosResponse } from 'axios'

import { Decision } from '~/entities/decision'
import api from '~/shared/axios'
import { Id } from '~/utils/core'

export interface RequestData {
  id: Id
}

export type ResponseData = Decision

export type Response = AxiosResponse<ResponseData>

export const url = `/mocks/decision`

export async function request(requestData: RequestData): Promise<Response> {
  // TODO validation
  const response = await api.get<ResponseData>(`${url}/${requestData.id}.json`)
  // TODO validation
  return response
}
