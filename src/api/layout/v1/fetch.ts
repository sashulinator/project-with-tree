import { AxiosResponse } from 'axios'

import { Layout } from '~/entities/layout'
import api from '~/shared/axios'
import { Id } from '~/utils/core'

export interface RequestData {
  id: Id
}

export type ResponseData = Layout

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/layout`

export async function makeRequest(requestData: RequestData): Promise<Response> {
  // TODO validation
  const response = await api.get<ResponseData>(`${url}/${requestData.id}`)
  // TODO validation
  return response
}
