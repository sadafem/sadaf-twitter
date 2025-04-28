import { useState, useEffect } from 'react'
import { Tweet } from '@/types/tweet'
import { tweetService } from '@/services/tweet'
import { TweetCard } from './TweetCard'
import { CreateTweet } from './CreateTweet'
import { useAuth } from '@/context/AuthContext'

export function TweetList() {
  const { user } = useAuth()
  const [tweets, setTweets] = useState<Tweet[]>([])
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(true)

  const fetchTweets = async () => {
    try {
      const data = await tweetService.getAllTweets()
      // Sort tweets by updatedAt in descending order (newest first)
      const sortedTweets = data.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
      setTweets(sortedTweets)
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to fetch tweets')
      }
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchTweets()
  }, [])

  const handleTweetCreated = (newTweet: Tweet) => {
    setTweets(prev => {
      const newTweets = [newTweet, ...prev]
      return newTweets.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    })
  }

  const handleTweetUpdated = (updatedTweet: Tweet) => {
    setTweets(prev => {
      const newTweets = prev.map(tweet => 
        tweet.id === updatedTweet.id ? updatedTweet : tweet
      )
      return newTweets.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      )
    })
  }

  const handleTweetDeleted = (deletedId: string) => {
    setTweets(prev => prev.filter(tweet => tweet.id !== deletedId))
  }

  if (isLoading) {
    return (
      <div className="p-4 text-center text-white">
        Loading tweets...
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-4 text-center text-red-500">
        {error}
      </div>
    )
  }

  return (
    <div className="divide-y divide-gray-700">
      {user && (
        <CreateTweet onTweetCreated={handleTweetCreated} />
      )}
      {tweets.length === 0 ? (
        <div className="p-4 text-center text-gray-400">
          No tweets yet. Be the first to tweet!
        </div>
      ) : (
        tweets.map(tweet => (
          <TweetCard
            key={tweet.id}
            tweet={tweet}
            onUpdate={handleTweetUpdated}
            onDelete={handleTweetDeleted}
          />
        ))
      )}
    </div>
  )
} 