
type Driver = {
  id : number,
  name  : string
}

type Ride = {
  id: number,
  date: Date,
  origin: string,
  destination: string,
  distance: number,
  duration:string,
  driver:  Driver
  value: number
}

export type FindRideInput = {
  customer_id: string
  driver_id?: number
}

export type FindRideResponse = {
  customer_id: string;
  rides: Ride[]
}

export interface FindRide {
  execute(data: FindRideInput): Promise<FindRideResponse>
}