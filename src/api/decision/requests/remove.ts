import { AxiosResponse } from 'axios'

import { EditorDecision } from '~/entities/decision'
import api from '~/shared/axios'
import { Id } from '~/utils/core'

export interface RequestData {
  id: Id
}

export type ResponseData = EditorDecision

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/tree`

export async function request(requestData: RequestData): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.delete<ResponseData>(`${url}/${requestData.id}`)
  // TODO validation
  return response
}
