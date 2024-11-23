import { CalculateRoutes, CalculateRoutesResponse, Position } from "@/contracts/integration/calculate-routes";
import { RoutesClient } from '@googlemaps/routing';

export default class GoogleMapService implements CalculateRoutes {

  constructor(private googleClientRouting: RoutesClient) { }

  async execute(startLocation: string, endLocation: string): Promise<CalculateRoutesResponse> {
    try {
      const result = await this.googleClientRouting.computeRoutes({
        travelMode: 'DRIVE',
        origin: {
          address: startLocation
        },
        destination: {
          address: endLocation
        },
        units: 'IMPERIAL',
      }, {
        otherArgs: {
          headers: {
            "X-Goog-FieldMask": "*",
          },
        }
      })

      if (!result) {
        throw new Error('Error during calculate router')
      }
  
      const distance = result?.[0].routes?.[0].distanceMeters as number
      const duration = result?.[0].routes?.[0].duration?.seconds as string
      const origin = result?.[0].routes?.[0].legs?.[0]?.startLocation?.latLng as Position
      const destination = result?.[0].routes?.[0].legs?.[0]?.endLocation?.latLng as Position
       
      return {
        resume: {
          distance, duration, origin, destination
        },
        originalResponse: result
      }
    }
    catch (error) {
      console.error(error)
      throw new Error('Error during calculate router')
    }
    
  }
}