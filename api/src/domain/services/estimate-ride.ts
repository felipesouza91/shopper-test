type Review = {
  rating: number
  comment: string
}

type DriverOptions = {
  id: number
  name: string
  description: string
  vehicle: string
  review: Review
  value: number
} 


type Position = {
  latitude: number;
  longitude: number;
}


export type EstimateRideDto = {
  origin: Position;
  destination: Position;
  distance: number;
  duration: string;
  options: DriverOptions[];
  routeResponse: object
}


export type EstimateRideInput = {
  customer_id: string;
  origin: string;
  destination: string
}

export interface EstimateRide {
execute(data: EstimateRideInput): Promise<EstimateRideDto>
}