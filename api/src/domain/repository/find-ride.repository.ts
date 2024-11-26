
type Drive = {
  id: number
  name: string
}

export type FindRideRepositoryResponse = {
  id: number;
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver: Drive
  value: number
  date: Date
}

export type FindRideRepositoryInput  = {
  customerId: string
  driverId?: number
}

export interface FindRideRepository {
  execute(input: FindRideRepositoryInput): Promise<FindRideRepositoryResponse[]>
}