import { AxiosResponse } from 'axios'

import { RulesResponse } from '~/entities/rules/types/rules-type'
import { addGHPagesUrl } from '~/lib/gh-pages/add-gh-pages-url'
import api from '~/shared/axios'

export const url = addGHPagesUrl(`/mocks/rules`)

export async function makeRequest(requestData: { id: string }): Promise<AxiosResponse<RulesResponse>> {
  const response = await api.get<RulesResponse>(`${url}/${requestData.id}.json`)
  return response
}
