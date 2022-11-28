declare module 'Models' {
  export interface Login {
    id: string
    username: string
    password: string
    address: address
  }

  export interface LoginResponse {
    accessToken: any
    username: any
    permission: any
  }
}
