


export interface Position {
  latitude: number;
  longitude: number;
}

export interface ResumeCalculate {
  distance: number,
  duration: string,
  origin: Position
  destination: Position
}

export interface CalculateRoutesResponse {
  resume: ResumeCalculate
  originalResponse: object
}


export interface CalculateRoutes {
  execute(origin: string, destination: string): Promise<CalculateRoutesResponse>
}