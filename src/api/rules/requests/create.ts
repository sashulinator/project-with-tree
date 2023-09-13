import { AxiosResponse } from 'axios'

import { EditorValues } from '~/entities/rule/models/editorRulesValues'
import api from '~/shared/axios'

import { ResponseData } from '../types/response-data'

export type Response = AxiosResponse<ResponseData>

export interface RequestData {
  name: string
  keyName: string
  frontValue: EditorValues[]
  userId: string
}

export const url = `/api/v1/rule/createRule`

export async function request(requestData: RequestData): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}`, requestData)
  // TODO validation
  return response
}
