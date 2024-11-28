import { api } from "../utils/api"

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


type EstimateRideType = {
  customer_id: string
  origin: string
  destination: string
}

type Reponse = {
  success: boolean
}

type ConfirmRideInput = {
  customer_id: string
  origin: string
  destination: string
  distance: number
  duration: string
  driver: {
    id: number
    name: string
  }
  value: string
}

async function estimateRide(input: EstimateRideType) {
  return await api.post<EstimateRideType>(`/ride/estimate`, input)
}


async function confirmRide(data: ConfirmRideInput ) {
  return await api.patch<Reponse>('/ride/confirm', data)
}


async function searchDriverByCustomerId(customerId: string, driverId?: number) {
  return await api.get(`/ride/${customerId}`, {
    params: {
      driver_id: driverId
    }
  })
}



export { confirmRide, estimateRide, searchDriverByCustomerId }

