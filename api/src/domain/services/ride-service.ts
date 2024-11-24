
export interface DriveInput {
    id: number
    name: string
}


export interface ConfirmRideServiceInput {
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver: DriveInput
  value: number
}

export interface ConfirmRideService {
  execute(data: ConfirmRideServiceInput): Promise<void>
}