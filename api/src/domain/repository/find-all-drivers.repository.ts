export type Review = { 
  rating: number
  comment: string
}


export type FindAllDriverRepositoryResponse = {
  id: number
  name: string
  description: string
  vehicle: string
  review: Review
  tax: number
  minKm: number
}


export interface FindAllDriverRepository {
  execute(): Promise<FindAllDriverRepositoryResponse[]>
}