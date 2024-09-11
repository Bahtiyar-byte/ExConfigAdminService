import axios, { AxiosResponse, AxiosError, AxiosRequestConfig, RawAxiosResponseHeaders } from 'axios'

interface ApiResponse<T> {
  data: T
  status: number
  statusText: string
  headers: RawAxiosResponseHeaders
  config: AxiosRequestConfig
}

enum HttpMethod {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  DELETE = 'DELETE',
  PATCH = 'PATCH'
}

export class HttpService {
  protected headers: Record<string, string>
  protected defaultConfig: AxiosRequestConfig
  private abortController: AbortController
  public loading = false

  constructor(defaultConfig: AxiosRequestConfig) {
    this.headers = {
      'x-api-version': '',
      'x-origin': '',
      'x-correlation-Id': '',
      version: 'v1'
    }
    this.defaultConfig = {
      timeout: 15000,
      withCredentials: false,
      ...defaultConfig
    }

    this.abortController = new AbortController()
  }

  // Get authorization token for requests
  private get getAuthorization() {
    return {}
  }

  // Set up request headers
  private setupHeaders(hasAttachment: boolean = false) {
    return hasAttachment
      ? {
          'Content-Type': 'multipart/form-data',
          'Access-Control-Allow-Origin': '*',
          ...this.getAuthorization
        }
      : {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': '*',
          ...this.getAuthorization
        }
  }

  private async fetch<T>(method: HttpMethod, url: string, config: AxiosRequestConfig): Promise<ApiResponse<T>> {
    config = { ...this.defaultConfig, ...config }
    config.headers = {
      ...this.headers,
      ...config.headers
    }
    config.signal = this.abortController.signal

    if (
      config.data &&
      config.data instanceof FormData === false &&
      (method === HttpMethod.POST || method === HttpMethod.PUT || method === HttpMethod.PATCH)
    ) {
      if (typeof config.data === 'object' && config.data !== null) {
        const { ...rest } = config.data
        config.data = rest
      }
    }

    const response = await this.request(method, url, config)
    return response
  }

  // Handle HTTP requests
  private async request(method: HttpMethod, url: string, options: AxiosRequestConfig): Promise<AxiosResponse> {
    const retries = 3
    let attempts = 0

    let response: AxiosResponse = {} as AxiosResponse
    while (attempts < retries) {
      try {
        response = await axios({
          method,
          url,
          ...options
        })

        return response
      } catch (error: unknown | AxiosError) {
        attempts++
        if (attempts === retries) {
          return this.normalizeError(error)
        }
      }
    }

    return response
  }

  // GET request
  public async get<T>(url: string, config?: AxiosRequestConfig, hasAttachment = false): Promise<ApiResponse<T>> {
    const attachmentHeaders = this.setupHeaders(hasAttachment)

    return await this.fetch<T>(HttpMethod.GET, url, {
      ...config,
      headers: {
        ...this.headers,
        ...config?.headers,
        ...attachmentHeaders
      }
    })
  }

  // POST request
  public async post<T, P>(
    url: string,
    payload: P,
    config?: AxiosRequestConfig,
    hasAttachment = false
  ): Promise<ApiResponse<T>> {
    const attachMmentHeaders = this.setupHeaders(hasAttachment)

    return await this.fetch<T>(HttpMethod.POST, url, {
      ...config,
      data: payload,
      headers: {
        ...this.headers,
        ...config?.headers,
        ...attachMmentHeaders
      }
    })
  }

  // UPDATE request
  public async update<T, P>(
    url: string,
    payload: P,
    config?: AxiosRequestConfig,
    hasAttachment: boolean = false
  ): Promise<ApiResponse<T>> {
    const attachMmentHeaders = this.setupHeaders(hasAttachment)
    return await this.fetch<T>(HttpMethod.PUT, url, {
      ...config,
      data: payload,
      headers: {
        ...this.headers,
        ...config?.headers,
        ...attachMmentHeaders
      }
    })
  }

  private normalizeError(error: unknown | AxiosError) {
    return Promise.reject(error)
  }
}
