import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import { tweetService } from '@/services/tweet'
import { Tweet } from '@/types/tweet'

interface CreateTweetProps {
  onTweetCreated: (tweet: Tweet) => void
}

export function CreateTweet({ onTweetCreated }: CreateTweetProps) {
  const [content, setContent] = useState('')
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    if (content.length === 0) {
      setError('Tweet cannot be empty')
      return
    }

    if (content.length > 140) {
      setError('Tweet cannot exceed 140 characters')
      return
    }

    setIsLoading(true)
    setError('')

    try {
      const tweet = await tweetService.createTweet({ content })
      onTweetCreated(tweet)
      setContent('')
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message)
      } else {
        setError('Failed to create tweet')
      }
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        maxLength={140}
        className="w-full bg-gray-50 dark:bg-gray-800 text-gray-900 dark:text-white mb-2 border-gray-200 dark:border-gray-700"
        placeholder="What's happening?"
      />
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          {content.length}/140 characters
        </span>
        <Button
          type="submit"
          disabled={isLoading || content.length === 0}
          className="bg-twitter-blue hover:bg-twitter-blue/90 text-white"
        >
          {isLoading ? 'Posting...' : 'Tweet'}
        </Button>
      </div>
      {error && (
        <p className="text-red-500 text-sm mt-2">{error}</p>
      )}
    </form>
  )
} 