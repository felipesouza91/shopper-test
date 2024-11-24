export type Review = { 
  rating: number
  comment: string
}


export type FindDriverByIdResponse = {
  id: number
  name: string
  description: string
  vehicle: string
  review: Review
  tax: number
  minKm: number
}


export interface FindDriverByIdRepository {
  execute(id: number): Promise<FindDriverByIdResponse | undefined>
}