import { AxiosResponse } from 'axios'

import { EditorValues } from '~/entities/rule/models/editorRulesValues'
import api from '~/shared/axios'
import { Id } from '~/utils/core'

export type ResponseData = {
  message: 'Rule created successfully'
  response_code: '200'
}

export interface RequestData {
  id: Id
  name: string
  keyName: string
  frontValue: EditorValues[]
  userId: string
}

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/rule`

export async function request(requestData: RequestData): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}/${requestData.id}`, requestData)
  // TODO validation
  return response
}
