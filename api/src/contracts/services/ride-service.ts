
interface DriveInput {
    id: number
    name: string
}


interface ConfirmRideServiceInput {
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  drive: DriveInput
  value: number
}

export interface ConfirmRideService {
  executer(data: ConfirmRideServiceInput): Promise<void>
}