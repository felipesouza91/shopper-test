

export type SaveRideResponse = {
  id: number;
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  drive_id: number
  value: number
}

export type SaveRideInput = Omit<SaveRideResponse, 'id'>

export interface SaveRideRepository {
  execute(input: SaveRideInput): Promise<SaveRideResponse>
}