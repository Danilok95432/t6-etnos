export type HeroesGroupsResponse = {
  groups: HeroesGroupItem[]
}

export type HeroesGroupItem = {
  id: string
  group_name: string
  region_name: string
  city_name: string
  users_count: string
  reg_date: string
}