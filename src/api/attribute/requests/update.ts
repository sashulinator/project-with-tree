import { AxiosResponse } from 'axios'

import { Attribute } from '~/entities/attribute'
import api from '~/shared/axios'
import { Id } from '~/utils/core'

interface ResponseData {
  message: string
  response_code: '200'
}

export type UpdateAttribute = Omit<Attribute, 'rev' | 'createdBy' | 'updatedBy'> & { userId: Id }

export type Response = AxiosResponse<ResponseData>

export type RequestData = {
  attribute: UpdateAttribute
}

export const url = `/api/v1/attribute`

export async function request(requestData: RequestData): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}/${requestData.attribute.id}`, requestData.attribute)
  // TODO validation
  return response
}
