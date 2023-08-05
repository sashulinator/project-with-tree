import { AxiosResponse } from 'axios'

import { Domain } from '~/entities/rules/types/rules-type'
import { addGHPagesUrl } from '~/lib/gh-pages/add-gh-pages-url'
import api from '~/shared/axios'
import { Id } from '~/utils/core'

export interface RequestData {
  id: Id
}

export type ResponseData = Domain

export type Response = AxiosResponse<ResponseData>

export const url = addGHPagesUrl(`/mocks/decision`)

export async function makeRequest(requestData: RequestData): Promise<Response> {
  // TODO validation
  const response = await api.get<ResponseData>(`${url}/${requestData.id}.json`)
  // TODO validation
  return response
}
