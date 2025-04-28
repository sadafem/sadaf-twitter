export interface Tweet {
  id: string
  content: string
  userId: string
  username: string
  createdAt: string
  updatedAt: string
}

export interface CreateTweetRequest {
  content: string
}

export interface UpdateTweetRequest {
  content: string
} 