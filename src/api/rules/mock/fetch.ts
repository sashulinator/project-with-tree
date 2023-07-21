import { AxiosResponse } from 'axios'

import { DomainsResponse } from '~/entities/rules/types/rules-type'
import { addGHPagesUrl } from '~/lib/gh-pages/add-gh-pages-url'
import api from '~/shared/axios'

export const url = addGHPagesUrl(`/mocks/rules`)

export async function makeRequest(requestData: { id: string }): Promise<AxiosResponse<DomainsResponse>> {
  const response = await api.get<DomainsResponse>(`${url}/${requestData.id}.json`)
  return response
}
