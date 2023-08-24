import { AxiosResponse } from 'axios'

import { EditorDecision } from '~/entities/decision'
import api from '~/shared/axios'

export interface RequestData {
  editorDecision: EditorDecision
}

export type ResponseData = EditorDecision

export type Response = AxiosResponse<ResponseData>

export const url = `/api/v1/tree/createDecisionUITree`

export async function request(requestData: RequestData): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}`, requestData.editorDecision)
  // TODO validation
  return response
}
