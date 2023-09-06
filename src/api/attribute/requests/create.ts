import { AxiosResponse } from 'axios'

import { Attribute } from '~/entities/attribute'
import api from '~/shared/axios'
import { Id } from '~/utils/core'

interface ResponseData {
  message: string
  response_code: '200'
}

export type CreateAttribute = Omit<Attribute, 'id' | 'rev' | 'createdBy' | 'updatedBy'> & { userId: Id }

export type Response = AxiosResponse<ResponseData>

export type RequestData = {
  attribute: CreateAttribute
}

export const url = `/api/v1/attribute/createAttribute`

export async function request(requestData: RequestData): Promise<Response> {
  // return {} as Promise<Response>

  // TODO validation
  const response = await api.post<ResponseData>(`${url}`, requestData.attribute)
  // TODO validation
  return response
}
