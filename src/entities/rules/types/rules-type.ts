export interface RulesResponse {
  id: string
  name: string
  version: string
  status: string
  data: RulesItem[]
}

export interface RulesItem {
  id: number
  name: string
  attributes: Record<string, string | number | Array<Record<string, string | number>>>
}
