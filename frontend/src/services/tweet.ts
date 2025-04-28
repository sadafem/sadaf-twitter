import { API_BASE_URL, ENDPOINTS } from '@/lib/api'
import { Tweet, CreateTweetRequest, UpdateTweetRequest } from '@/types/tweet'

// Helper function to transform backend tweet format to frontend format
const transformTweet = (tweet: any): Tweet => {
  return {
    id: tweet._id || tweet.id,
    content: tweet.content,
    userId: tweet.author?._id || tweet.author,
    username: tweet.author?.username || tweet.username,
    createdAt: tweet.createdAt,
    updatedAt: tweet.updatedAt
  }
}

export const tweetService = {
  async getAllTweets(): Promise<Tweet[]> {
    try {
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.TWEETS.LIST}`)
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to fetch tweets')
      }

      return data.map(transformTweet)
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error. Please check your connection.')
    }
  },

  async createTweet(tweet: CreateTweetRequest): Promise<Tweet> {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.TWEETS.CREATE}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tweet),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to create tweet')
      }

      return transformTweet(data)
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error. Please check your connection.')
    }
  },

  async updateTweet(id: string, tweet: UpdateTweetRequest): Promise<Tweet> {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.TWEETS.UPDATE(id)}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(tweet),
      })

      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.message || 'Failed to update tweet')
      }

      return transformTweet(data)
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error. Please check your connection.')
    }
  },

  async deleteTweet(id: string): Promise<void> {
    try {
      const token = localStorage.getItem('token')
      const response = await fetch(`${API_BASE_URL}${ENDPOINTS.TWEETS.DELETE(id)}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.message || 'Failed to delete tweet')
      }
    } catch (error) {
      if (error instanceof Error) {
        throw error
      }
      throw new Error('Network error. Please check your connection.')
    }
  },
} 