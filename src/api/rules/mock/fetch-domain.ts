import { AxiosResponse } from 'axios'

import { DomainListResponse } from '~/entities/rule/types/rules-type'
import api from '~/shared/axios'

export const url = '/mocks/rules'

export async function makeRequest(requestData: { id: string }): Promise<AxiosResponse<DomainListResponse>> {
  const response = await api.get<DomainListResponse>(`${url}/${requestData.id}.json`)
  return response
}
