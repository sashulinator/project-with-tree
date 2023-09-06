import { AxiosResponse } from 'axios'

import { RulesListResponse } from '~/entities/rule/types/rules-type'
import { addGHPagesUrl } from '~/lib/gh-pages/add-gh-pages-url'
import api from '~/shared/axios'

export const url = addGHPagesUrl(`/mocks/rules`)

export async function makeRequestRules(requestData: { id: string }): Promise<AxiosResponse<RulesListResponse>> {
  const response = await api.get<RulesListResponse>(`${url}/${requestData.id}.json`)
  return response
}
