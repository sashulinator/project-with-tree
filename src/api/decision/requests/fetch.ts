import { AxiosResponse } from 'axios'

import { Decision } from '~/entities/decision'
import api from '~/shared/axios'
import { Id } from '~/utils/core'

export interface RequestData {
  id: Id
}

export type ResponseData = Decision[]

export type Response = AxiosResponse<ResponseData>

export const url = `/tree/decisionUITree`

export async function request(requestData: RequestData): Promise<Response> {
  // TODO validation
  const response = await api.get<ResponseData>(`${url}`, {
    params: { id: requestData.id },
  })
  // TODO validation
  return response
}
