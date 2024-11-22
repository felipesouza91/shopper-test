
export interface HttpRequest {
  body?: any,
  headers?: any
}

export interface HttpResponse {
  body?: any,
  statusCode: number
}


export interface Controller {
  handle(request: HttpRequest): Promise<HttpResponse>
}