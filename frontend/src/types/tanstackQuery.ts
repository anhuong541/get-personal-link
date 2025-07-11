// Auth Types
export interface LoginRequest {
  email: string
  password: string
}

export interface RegisterRequest {
  email: string
  password: string
  confirmPassword: string
  username: string
  description?: string
}

export interface LoginResponse {
  success: boolean
  data: {
    user: {
      uid: string
      email: string | null
      displayName: string | null
      photoURL: string | null
    }
  }
}

export interface RegisterResponse {
  success: boolean
  data: {
    user: {
      uid: string
      email: string | null
      displayName: string | null
      photoURL: string | null
    }
  }
}
